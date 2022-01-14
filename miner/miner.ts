import TransactionPool from "../wallet/transaction_pool";
import Blockchain from "../core/blockchain";
import Wallet from "../wallet";
import P2PServer from "../peer-2-peer-server/p2pserver";

class Miner {
  public transactionPool: TransactionPool; // transactionPool instance for the miner
  public blockchain: Blockchain; // blockchain instance for the miner
  public wallet: Wallet; // wallet for the miner
  public p2pServer: P2PServer; // reference to the peer-2-peer server

  constructor(
    transactionPool: TransactionPool,
    blockchain: Blockchain,
    wallet: Wallet,
    p2pServer: P2PServer
  ) {
    this.transactionPool = transactionPool;
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  /**
   * Method that will take transactions from the transaction pool and mine a block and then broadcast it to the network using the p2p server and then clear the transaction pool
   */
  mint() {
    const validTransactions = this.transactionPool.validTransactions();
  }
}

export default Miner;
