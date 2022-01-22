import WebSocket from "ws";
import dotenv from "dotenv";
import Blockchain from "../core/blockchain";
import TransactionPool from "../wallet/transaction_pool";
import Transaction from "../wallet/transaction";
import { MESSAGE_OPTION_TYPES, MESSAGE_OPTION } from "../utils/types";

/**
 * The main idea for this peer-to-peer server is:
 * - Connecting to an existing peer socket
 * - If no peer socket is found, create a new one
 */

dotenv.config({
  path: ".env",
});

const P2P_PORT: number = parseInt(process.env.P2P_PORT!) || 5001;

/**
 * string list of peers servers that can be connected. If the PEERS env exists, use it
 * else initialize with an empty array
 *
 * example of the PEERS env: 'ws://localhost:5001,ws://localhost:5002,ws://localhost:5003'
 */
const peers: String[] = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2PServer {
  public blockchain: Blockchain;
  public transactionPool: TransactionPool;
  public sockets: any;
  constructor(blockchain: Blockchain, transactionPool: TransactionPool) {
    this.blockchain = blockchain; // the own blockchain copy for the peer
    this.transactionPool = transactionPool; // the own transaction pool copy for the peer
    this.sockets = []; // list of sockets servers that end up connecting to this peer
  }

  /**
   * method for listening for a new server connection to this peer
   */

  listen() {
    const wServer = new WebSocket.Server({ port: P2P_PORT }); // creating a new server instance for the peer
    wServer.on("connection", (socket) => this.connectSocket(socket));
    this.connectToPeers(); // running this method to connect to the active peers if any
    console.log(`Listening for the peer-to-peer connections on: ${P2P_PORT}`);
  }

  /**
   * method for connecting the current peers to the available socket-connection for another peer
   */

  connectToPeers() {
    // connecting to all the listed peers active in the PEERS env
    peers.forEach((peer) => {
      // example of peers: ws://localhost:5001
      const socket = new WebSocket(peer as string); // creating a new socket object based on the peer-socket address

      // we are using open to have the assurance that even if the peers is not open specified port, we can still connect to it when it is open
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  /**
   * @param socket the socket add to the socket list
   * method for adding a new connected peer to the socket-list
   */

  connectSocket(socket: WebSocket) {
    this.sockets.push(socket); // add the socket-url for the peer to the list of sockets
    console.log(`Socket connected`);

    this.messageHandler(socket); // running the message handler method for the socket to subscribe to the message

    this.sendChain(socket);
  }

  // for handling cross peers communication in the blockchain

  messageHandler(socket: WebSocket) {
    socket.on("message", (message: string) => {
      const data: { type: MESSAGE_OPTION_TYPES; data: any } =
        JSON.parse(message); // converting the stringified JSON message to JSON object
      console.log(data);
      switch (data.type) {
        case MESSAGE_OPTION.chain:
          this.blockchain.replaceChain({ chain: data } as any); // trying to replace the current chain with the new one received from the peers with longer-chain in action
          break;
        case MESSAGE_OPTION.transaction:
          this.transactionPool.updateOrAddTransaction(data.data); // updating the transaction pool with the new transaction received from the peers
          break;
        case MESSAGE_OPTION.clear:
          this.transactionPool.clearTransactionPool(); // clearing the transaction pool
          break;
        default:
          console.log("Invalid message type");
      }
    });
  }

  /**
   * util method for sending a message with chain data for current peer to all the peers
   * @param socket the socket to which the message is sent
   */

  sendChain(socket: WebSocket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_OPTION.chain,
        data: this.blockchain.chain,
      })
    ); // sending the blockchain to the peers from other peers
  }

  /**
   * method for sending a message to all the peers to sync then the chain for the entire blockchain
   */

  syncChains() {
    this.sockets.forEach((socket: WebSocket) => this.sendChain(socket));
  }

  /**
   *
   * @param socket the socket to which the transaction is sent
   * @param transaction the transaction to be sent
   * method for sending the newly added transaction to the peers
   */

  sendTransaction(socket: WebSocket, transaction: Transaction) {
    socket.send(
      JSON.stringify({ type: MESSAGE_OPTION.transaction, data: transaction })
    );
  }

  /**
   *
   * @param transaction the transaction to be added to the peers
   * method for broadcasting a new transaction to the peers by calling the sendTransaction method
   */

  broadcastTransaction(transaction: Transaction) {
    this.sockets.forEach((socket: WebSocket) =>
      this.sendTransaction(socket, transaction)
    );
  }

  /**
   * @description: Method for broadcasting the peers to clear their transaction pool
   */

  broadcastClearTransactionPool() {
    this.sockets.forEach((socket: WebSocket) =>
      socket.send(JSON.stringify({ type: MESSAGE_OPTION.clear }))
    );
  }
}

export default P2PServer;
