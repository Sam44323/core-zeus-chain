import Blockchain from "../../core/blockchain";
import P2PServer from "../../peer-2-peer-server/p2pserver";
import Wallet from "../../wallet/index";
import TransactionPool from "../../wallet/transaction_pool";
import Miner from "../../miner/miner";

let zeusBlockchain: Blockchain;
let p2pServer: P2PServer;
let wallet: Wallet;
let transactionPool: TransactionPool;
let minerInstance: Miner;

const chainInitializer = () => {
  zeusBlockchain = new Blockchain();
  wallet = new Wallet(); // creating a new wallet for the node
  transactionPool = new TransactionPool();
  p2pServer = new P2PServer(zeusBlockchain, transactionPool);
  minerInstance = new Miner(transactionPool, zeusBlockchain, wallet, p2pServer);
  p2pServer.listen();
};

const getZeusBlockchain = () => zeusBlockchain;

const addNewBlock = (data: any) => zeusBlockchain.addBlock(data);

export {
  chainInitializer,
  getZeusBlockchain,
  addNewBlock,
  p2pServer,
  wallet,
  transactionPool,
  minerInstance,
};
