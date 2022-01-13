import Blockchain from "../../core/blockchain";
import P2PServer from "../../peer-2-peer-server/p2pserver";
import Wallet from "../../wallet/index";
import TransactionPool from "../../wallet/transaction_pool";

let zeusBlockchain: Blockchain;
let p2pServer: P2PServer;

const chainInitializer = () => {
  zeusBlockchain = new Blockchain();
  const wallet = new Wallet(); // creating a new wallet for the node
  const transactionPool = new TransactionPool();
  p2pServer = new P2PServer(zeusBlockchain);
  p2pServer.listen();
};

const getZeusBlockchain = () => zeusBlockchain;

const addNewBlock = (data: any) => zeusBlockchain.addBlock(data);

export { chainInitializer, getZeusBlockchain, addNewBlock, p2pServer };
