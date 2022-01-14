import TransactionPool from "../wallet/transaction_pool";
import Blockchain from "../core/blockchain";
import Wallet from "../wallet";

class Miner {
  public transactionPool: TransactionPool; // transactionPool instance for the miner
  public blockchain: Blockchain; // blockchain instance for the miner
  public wallet: Wallet; // wallet for the miner

  constructor(
    transactionPool: TransactionPool,
    blockchain: Blockchain,
    wallet: Wallet
  ) {
    this.transactionPool = transactionPool;
    this.blockchain = blockchain;
    this.wallet = Wallet;
  }
}

export default Miner;
