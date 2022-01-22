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
      logger.info(
        `Time [${new Date().toLocaleString()}] [ACTION] [Transaction-Pool] [Transaction update] ✅ Updated the transaction with id: ${
          transaction.id
        }`
      );
    } else {
      this.transactions.push(transaction);
      logger.info(
        `Time [${new Date().toLocaleString()}] [ACTION] [Transaction-Pool] [Transaction created]  ✅ Added the transaction with id: ${
          transaction.id
        }`
      );
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

  /**
   * Method for validating the transactions in the pool and returns the valid transactions to the caller
   */
  validTransactions(): any {
    /**
     * @description: We are checking if a transactions is valid or not in following ways:
     *
     * - Adding all the amount for the output array balance and if it's not equal to the current balance for the input(senderWallet amount), then it's invalid
     *
     * - We are also checking if the signature is valid or not by using the verifySignature method in the transaction class
     */
    return this.transactions.filter((transaction: Transaction) => {
      const totalOutput = transaction.output.reduce((total: number, o: any) => {
        return total + o.amount;
      }, 0);

      // for checking if the total output amount is equal to the input amount(senderWallet amount-value)

      if (totalOutput !== transaction.input.amount) {
        logger.info(
          `Time [${new Date().toLocaleString()}] [ACTION] [Transaction-Pool] [Transaction created]  ❌ INvalid transaction from the address: ${
            transaction.input.address
          }`
        );
        return;
      }

      // checking the signature validation of the transaction

      if (!Transaction.verifyTransaction(transaction)) {
        logger.info(
          `Time [${new Date().toLocaleString()}] [ACTION] [Transaction-Pool] [Transaction created]  ❌ Invalid transaction signature from: {$
            transaction.input.address
          }`
        );

        return;
      }

      return transaction;
    });
  }
}

export default TransactionPool;
