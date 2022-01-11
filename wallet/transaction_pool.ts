import Transaction from "./transaction";

class TransactionPool {
  public transactions: Transaction[] = [];
  constructor() {
    this.transactions = [];
  }
}

export default TransactionPool;
