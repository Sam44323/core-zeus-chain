import ChainUtil, { EC } from "../utils/chain-util";
import Wallet from "./index";

class Transaction {
  public id: string = "";
  public input: EC.Signature | any; // consists the signature for the transactions
  public output: any;

  /**
   * output-array:
   * index[0]: contains the balance the sender will have after the transaction with the recipient is completed
   * index[1]: contains the amount of money the sender wants to send to the recipient
   */

  constructor() {
    this.id = ChainUtil.getUniqueId();
    this.input = null;
    this.output = [];
  }

  /**
   * method that gives the users the ability to create a transaction
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
          amount: senderWallet.balance - amount,
          address: senderWallet.publicKey,
        },
        {
          amount,
          address: recipientAddress,
        },
      ]
    );

    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  /**
   *
   * @param transaction the transaction object
   * @param senderWallet the wallet of the sender
   * stores the input setter in the transaction object with the listed data
   */

  static signTransaction(transaction: Transaction, senderWallet: Wallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.signData(ChainUtil.hash(transaction.output)),
    };
  }
}

export default Transaction;
