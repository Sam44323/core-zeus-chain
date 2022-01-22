import TransactionPool from "../wallet/transaction_pool";
import Blockchain from "../core/blockchain";
import Wallet from "../wallet";
import P2PServer from "../peer-2-peer-server/p2pserver";
import Transaction from "../wallet/transaction";

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
    /**
     * @description:  miner will be getting the valid transactions from the transaction pool
     */
    const validTransactions = this.transactionPool.validTransactions();

    /**
     * @description: We are pushing the reward-transaction for the miner to the validTransactions array and then we are creating a new block with the valid transactions
     */
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    );

    /**
     * @description: creating a block with the valid transactions
     */

    const block = this.blockchain.addBlock(validTransactions);

    /**
     * @description: synchronize the blockchain with the p2p-network
     */
    this.p2pServer.syncChains();

    /**
     * @description: clear the transaction pool local to this miner
     */
    this.transactionPool.clearTransactionPool();

    /**
     * @todo: broadcast to every miner in the network to clear their transaction pools
     */
  }
}

export default Miner;
