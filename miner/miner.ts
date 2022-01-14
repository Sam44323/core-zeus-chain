import TransactionPool from "../wallet/transaction_pool";
import Blockchain from "../core/blockchain";

class Miner {
  public transactionPool: TransactionPool;
  public blockchain: Blockchain;

  constructor(transactionPool: TransactionPool, blockchain: Blockchain) {
    this.transactionPool = transactionPool;
    this.blockchain = blockchain;
  }
}

export default Miner;
