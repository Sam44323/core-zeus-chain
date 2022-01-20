import Transaction from "../wallet/transaction";
import Wallet from "../wallet/index";

describe("Transaction", () => {
  let transactions: any, wallet: any, recipient: any, amount: any;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 49;
    recipient = "r3c1p13nt";
    transactions = Transaction.newTransaction(wallet, recipient, amount);
  });

  it("outputs the `amount` subtracted from the wallet balance from the sender", () => {
    expect(
      transactions.output.find(
        (output: any) => output.address === wallet.publicKey
      ).amount
    ).toEqual(wallet.balance - amount);
  });

  it("outputs the `amount` the recipient will receive from the transaction", () => {
    expect(
      transactions.output.find((output: any) => output.address === recipient)
        .amount
    ).toEqual(amount);
  });

  it("inputs the balance to the wallet", () => {
    expect(transactions.input.amount).toEqual(wallet.balance);
    console.log(transactions.input.amount, wallet.balance);
  });

  it("validates a valid transaction", () => {
    expect(Transaction.verifyTransaction(transactions)).toBe(true);
  });

  it("invalidates a corrupt transaction", () => {
    transactions.output[0].amount = 50000;
    expect(Transaction.verifyTransaction(transactions)).toBe(false);
  });
});

describe("Transaction issue checker for test", () => {
  let transactions: any, wallet: any, recipient: any, amount: any;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 5000;
    recipient = "r3c1p13nt";
    transactions = Transaction.newTransaction(wallet, recipient, amount);
  });

  it("transaction throws error when the amount is more than the wallet balance for the user", () => {
    expect(transactions).toEqual(undefined);
  });
});

describe("Test for updating a transaction", () => {
  let transactions: Transaction,
    wallet: any,
    recipient: any,
    amount: any,
    nextAmount: any,
    nextRecipient: any;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 49;
    recipient = "r3c1p13nt";
    transactions = Transaction.newTransaction(wallet, recipient, amount);
    nextAmount = 30;
    nextRecipient = "next-4dddr35555";
    transactions = transactions.updateTransaction(
      wallet,
      nextRecipient,
      nextAmount
    );
  });

  it("it subtracts the next `amount` from the sender's output", () => {
    expect(
      transactions.output.find(
        (output: any) => output.address === wallet.publicKey
      ).amount
    ).toEqual(wallet.balance - amount - nextAmount);
  });

  it("outputs and amount for the next recipient", () => {
    expect(
      transactions.output.find(
        (output: any) => output.address === nextRecipient
      ).amount
    ).toEqual(nextAmount);
  });
});

describe("Creating a reward_transaction", () => {
  let blockchainWallet: Wallet, minerWallet: Wallet, transaction: Transaction;

  beforeEach(() => {
    blockchainWallet = new Wallet();
    minerWallet = new Wallet();
    transaction = Transaction.rewardTransaction(minerWallet, blockchainWallet);
  });
});
