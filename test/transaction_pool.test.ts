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

  describe("mixing corrupt and valid transactions", () => {
    let validTransactions: Transaction[];

    beforeEach(() => {
      validTransactions = [...transactionPool.transactions];
      // making half of the transactions invalid and other half valid

      for (let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction(
          "recipient",
          10,
          transactionPool
        );
        if (i % 2 === 0) {
          transaction.input.amount = 999999;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it("shows a difference between valid and corrupt transactions", () => {
      expect(transactionPool.transactions).not.toEqual(validTransactions);
    });

    it("grabs the valid transactions from the transaction_pool", () => {
      expect(transactionPool.validTransactions()).toEqual(validTransactions);
    });
  });

  it("clears the transaction_pool", () => {
    transactionPool.clearTransactionPool();
    expect(transactionPool.transactions.length).toEqual(0);
  });
});
