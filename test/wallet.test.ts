import Wallet from "../wallet/index";
import TransactionPool from "../wallet/transaction_pool";
import Transaction from "../wallet/transaction";

describe("Test for wallet", () => {
  let wallet: Wallet,
    transaction: Transaction,
    amount: number,
    recipient: string,
    transactionPool: TransactionPool;
  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
    amount = 49;
    recipient = "r4nd0m-4ddr355";
    transaction = wallet.createTransaction(recipient, amount, transactionPool);
  });

  it("wallet is creating a transaction", () => {
    expect(
      JSON.stringify(
        transactionPool.transactions.find(
          (transaction: Transaction) => transaction.id
        )
      )
    ).toEqual(JSON.stringify(transaction));
  });

  it("doubles the `sendAmount` subtracted from the balance of the wallet and update the created transaction for that wallet in the pool", () => {
    wallet.createTransaction(recipient, amount, transactionPool);
    expect(
      transaction.output.find((o: any) => o.address === wallet.publicKey).amount
    ).toEqual(wallet.balance - amount * 2);
  });

  it("clones the `sendAmount` output for the recipient", () => {
    wallet.createTransaction(recipient, amount, transactionPool);
    expect(
      transaction.output.filter((o: any) => o.address === recipient).length
    ).toEqual(2);
  });
});
