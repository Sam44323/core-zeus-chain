import ChainUtil from "../utils/chain-util";
import Wallet from "./index";

class Transaction {
  public id: string = "";
  public input: any;
  public output: any;

  /**
   * output-array:
   * Each individual transaction is joined in pairs with the following structure
   * index[0]: contains the amount of money the sender wants to send to the recipient
   * index[1]: contains the balance the sender will have after the transaction with the recipient is completed
   */

  constructor() {
    this.id = ChainUtil.getUniqueId();
    this.input = null;
    this.output = [];
  }

  /**
   * method that gives the users to create a transaction
   */
  static newTransaction(
    senderWallet: Wallet,
    recipientAddress: any,
    amount: number
  ): Transaction | any {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance`);
      return;
    }
    const transaction: Transaction = new this();
    transaction.output.push(
      ...[
        {
          amount,
          address: recipientAddress,
        },
        {
          amount: senderWallet.balance - amount,
          address: senderWallet.publicKey,
        },
      ]
    );

    return transaction;
  }
}

export default Transaction;
