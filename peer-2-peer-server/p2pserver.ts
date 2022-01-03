import WebSocket from "ws";
import dotenv from "dotenv";
import Blockchain from "../core/blockchain";

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

  listen() {
    const wServer = new WebSocket.Server({ port: P2P_PORT }); // creating a new server instance for the peer
  }
}
