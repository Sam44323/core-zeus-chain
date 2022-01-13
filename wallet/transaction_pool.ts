import Transaction from "./transaction";
import logger from "../app/helper/winston_config";

class TransactionPool {
  public transactions: Transaction[] = []; // contains the list of unconfirmed transactions
  constructor() {
    this.transactions = [];
  }

  /**
   * method for adding or updating a transaction to the array of transaction
   * @param transaction the transaction to be added/status-updated to the pool array for confirmation
   */

  updateOrAddTransaction(transaction: Transaction) {
    let transactionWithId = this.transactions.find(
      (t: Transaction) => t.id === transaction.id
    );

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] =
        transaction;
      logger.info(`
           Time [${new Date().toLocaleString()}]
           [ACTION]
           [Transaction-Pool]
           [Transaction creation]
          ✅ Updated the transaction with id: ${transaction.id}`);
    } else {
      this.transactions.push(transaction);
      logger.info(`
           Time [${new Date().toLocaleString()}]
           [ACTION]
           [Transaction-Pool]
           [Transaction update]
          ✅ Added the transaction with id: ${transaction.id}`);
    }
  }

  /**
   *
   * @param address the address of the wallet for transaction
   * checks for a transaction in the transaction pool and returns the transaction if exists
   */

  existingTransaction(address: string): Transaction | undefined {
    return this.transactions.find(
      (transaction: Transaction) => transaction.input.address === address
    );
  }
}

export default TransactionPool;
