import ChainUtil, { EC } from "../utils/chain-util";
import { INITIAL_BALANCE } from "../utils/constants";
import TransactionPool from "./transaction_pool";
import Transaction from "./transaction";

class Wallet {
  public balance: number;
  public keyPair: EC.KeyPair;
  public publicKey: any;
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex", false);
  }

  toString() {
    return `
    Wallet -
    publicKey: ${this.publicKey.toString()}
    balance: ${this.balance}
    `;
  }

  /**
   * @param dataHash the hash representation of some data
   * @returns the signed data
   */

  signData(dataHash: any) {
    return this.keyPair.sign(dataHash);
  }

  /**
   *
   * @param recipient the recipient of the transaction
   * @param amount the amount of the transaction
   * @param transactionPool the transaction pool instance
   */

  createTransaction(
    recipient: string,
    amount: number,
    transactionPool: TransactionPool
  ) {
    if (amount > this.balance) {
      console.log(
        `Amount ${amount} exceeds the current wallet balance of ${this.balance}`
      );
      return;
    }
    let transaction: Transaction | undefined =
      transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      /**
       * as transaction pool stores the reference of the transaction, we are not calling updateOrAddTransaction here cause, it updates the transaction using call-by-reference
       */
      transaction = transaction.updateTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction!);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction!);
    }

    return transaction;
  }

  /**
   * Method for creating a blockchain_wallet that will only be one and will be used to send rewards to miners
   * @returns the blockchain-wallet instance
   */

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.publicKey = "blockchain-wallet"; // changing the wallet address to make sure this is the blockchain_wallet

    return blockchainWallet;
  }
}

export default Wallet;
