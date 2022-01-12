import Wallet from "../wallet/index";
import TransactionPool from "../wallet/transaction_pool";

describe("Test for wallet", () => {
  let wallet: Wallet, transactionPool: TransactionPool;
  beforeEach(() => {
    wallet = new Wallet();
  });
});
