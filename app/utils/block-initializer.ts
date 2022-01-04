import Blockchain from "../../core/blockchain";
import P2PServer from "../../peer-2-peer-server/p2pserver";

let zeusBlockchain: Blockchain;

const chainInitializer = () => {
  zeusBlockchain = new Blockchain();
  const p2pServer = new P2PServer(zeusBlockchain);
  p2pServer.listen();
};

const getZeusBlockchain = () => zeusBlockchain;

const addNewBlock = (data: any) => zeusBlockchain.addBlock(data);

export { chainInitializer, getZeusBlockchain, addNewBlock };
