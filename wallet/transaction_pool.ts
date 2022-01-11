import Transaction from "./transaction";

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
    } else {
      this.transactions.push(transaction);
    }
  }
}

export default TransactionPool;
