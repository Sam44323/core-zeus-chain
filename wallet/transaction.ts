import ChainUtil, { EC } from "../utils/chain-util";
import Wallet from "./index";

class Transaction {
  public id: string = "";
  public input:
    | any
    | {
        timestamp: number;
        amount: number;
        address: string;
        signature: any;
      }; // consists the signature for the transactions
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
   * @senderWallet is the wallet that is sending the money
   * @recipientAddress is the wallet that is receiving the money
   * @amount is the amount of money that is being sent
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
   * @senderWallet is the wallet that is sending the money
   * @recipientAddress is the wallet that is receiving the money
   * @amount is the amount of money that is being sent
   * method that gives the users the ability to update a transaction
   */

  updateTransaction(
    senderWallet: Wallet,
    recipientAddress: any,
    amount: number
  ) {
    // finding the sender's balance after transaction with which will be updated for the new transaction
    const senderOutput = this.output.find(
      (item: any) => item.address === senderWallet.publicKey
    );

    if (amount > senderOutput.amount) {
      console.log(`Amount: ${amount} exceeds balance`);
      return;
    }
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

  /**
   * @param transaction the transaction object
   * method for verifying the transaction
   */

  static verifyTransaction(transaction: Transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.output)
    );
  }
}

export default Transaction;
