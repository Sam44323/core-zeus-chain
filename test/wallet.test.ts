import Wallet from "../wallet/index";
import TransactionPool from "../wallet/transaction_pool";
import Transaction from "../wallet/transaction";
import Blockchain from "../core/blockchain";

describe("Test for wallet", () => {
  let wallet: Wallet,
    transaction: Transaction,
    amount: number,
    recipient: string,
    transactionPool: TransactionPool,
    chain: Blockchain;
  beforeEach(() => {
    chain = new Blockchain();
    wallet = new Wallet();
    transactionPool = new TransactionPool();
    amount = 49;
    recipient = "r4nd0m-4ddr355";
    transaction = wallet.createTransaction(
      recipient,
      amount,
      transactionPool,
      chain
    );
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
    console.log("Chain", chain);

    wallet.createTransaction(recipient, amount, transactionPool, chain);
    expect(
      transaction.output.find((o: any) => o.address === wallet.publicKey).amount
    ).toEqual(wallet.balance - amount * 2);
  });

  it("clones the `sendAmount` output for the recipient", () => {
    wallet.createTransaction(recipient, amount, transactionPool, chain);
    expect(
      transaction.output.filter((o: any) => o.address === recipient).length
    ).toEqual(2);
  });

  describe("calculating a balance of the wallet", () => {
    let addBalance: number, repeatAdd: number, senderWallet: Wallet;

    /**
     * addBalance: the amount we want to send the transaction to other wallet
     * repeatAdd: times we want to repeat this process
     */

    beforeEach(() => {
      senderWallet = new Wallet();
      addBalance = 100; // setting some arbitrary value(make sure the addition of addBalance and repeatAdd is not above the initial balance for the sender[which for this case i 500])
      repeatAdd = 4; // setting some arbitrary value(make sure the addition of addBalance and repeatAdd is not above the initial balance for the sender[which for this case i 500])
    });
  });
});
