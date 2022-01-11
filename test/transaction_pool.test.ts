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

  it("adds a valid transaction to the pool", () => {
    expect(
      transactionPool.transactions.find((t) => t.id === transaction.id)
    ).toEqual(transaction);
  });

  it("updates a valid transaction in the pool", () => {
    let updatedTransaction = transactionPool.transactions[0];
    transactionPool.updateOrAddTransaction(
      updatedTransaction.updateTransaction(wallet, "r3c1p13nt", 100)
    );
    expect(
      transactionPool.transactions.find((t) => t.id === updatedTransaction.id)
    ).toEqual(updatedTransaction);
  });
});
