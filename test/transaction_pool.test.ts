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
    transaction = wallet.createTransaction("recipient", 10, transactionPool);
  });

  it("adds a valid transaction to the pool", () => {
    expect(
      transactionPool.transactions.find((t) => t.id === transaction.id)
    ).toEqual(transaction);
  });

  it("updates a valid transaction in the pool", () => {
    const oldTransaction = JSON.stringify(transactionPool.transactions[0]);
    const newTransaction = transaction.updateTransaction(
      wallet,
      "r3c1p13nt",
      100
    );

    transactionPool.updateOrAddTransaction(newTransaction);
    expect(
      JSON.stringify(
        transactionPool.transactions.find((t) => t.id === newTransaction.id)
      )
    ).not.toEqual(oldTransaction);
  });
});
