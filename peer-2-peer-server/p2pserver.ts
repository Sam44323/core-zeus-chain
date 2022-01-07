import WebSocket from "ws";
import dotenv from "dotenv";
import Blockchain from "../core/blockchain";

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
  public sockets: any;
  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain; // the own blockchain copy for the peer
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

    socket.send(JSON.stringify(this.blockchain.chain)); // sending the blockchain to the peers from other peers
  }

  // for handling cross peers communication in the blockchain

  messageHandler(socket: WebSocket) {
    socket.on("message", (message: string) => {
      const data = JSON.parse(message); // converting the stringified JSON message to JSON object
      console.log(data);
      this.blockchain.replaceChain({ chain: data } as any); // replacing the current blockchain with the new one for the peers with longer-chains in action
    });
  }
}

export default P2PServer;
