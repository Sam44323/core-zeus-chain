import Blockchain from "../../core/blockchain";
import P2PServer from "../../peer-2-peer-server/p2pserver";

let zeusBlockchain: Blockchain;
let p2pServer: P2PServer;

const chainInitializer = () => {
  zeusBlockchain = new Blockchain();
  p2pServer = new P2PServer(zeusBlockchain);
  p2pServer.listen();
};

const getZeusBlockchain = () => zeusBlockchain;

const addNewBlock = (data: any) => zeusBlockchain.addBlock(data);

export { chainInitializer, getZeusBlockchain, addNewBlock, p2pServer };
