import ChainUtil, { EC } from "../utils/chain-util";
import { INITIAL_BALANCE } from "../utils/constants";

class Wallet {
  public balance: number;
  public keyPair: EC.KeyPair;
  public publicKey: any;
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic();
  }

  toString() {
    return `
    Wallet -
    publicKey: ${this.publicKey.toString()}
    balance: ${this.balance}
    `;
  }
}

export default Wallet;
