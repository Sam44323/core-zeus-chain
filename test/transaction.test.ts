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
      transactions.output.find((output) => output.address === wallet.publicKey)
        .amount
    ).toEqual(wallet.balance - amount);
  });
});
