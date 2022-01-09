import { INITIAL_BALANCE } from "../utils/constants";

class Wallet {
  public balance: number;
  public keyPair: any;
  public publicKey: any;
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }
}
