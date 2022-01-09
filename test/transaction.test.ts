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