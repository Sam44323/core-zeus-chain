import Transaction from "../wallet/transaction";
import TransactionPool from "../wallet/transaction_pool";
import Wallet from "../wallet/index";

describe("Test for transaction-pool", () => {
  let transactionPool: TransactionPool,
    transaction: Transaction,
    wallet: Wallet;
  beforeEach(() => {
    transactionPool = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, "r3c1p13nt", 49);
    transactionPool.updateOrAddTransaction(transaction);
  });
});
