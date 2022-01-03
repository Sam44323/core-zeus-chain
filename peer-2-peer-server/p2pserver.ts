import WebSocket from "ws";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const P2P_PORT = process.env.P2P_PORT || 5001;
// string list of peers servers that can be connected. If the PEERS env exists, use it else initialize with an empty array
const peers: String[] = process.env.PEERS ? process.env.PEERS.split(",") : [];
