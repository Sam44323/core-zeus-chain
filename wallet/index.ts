import ChainUtil, { EC } from "../utils/chain-util";
import { INITIAL_BALANCE } from "../utils/constants";

class Wallet {
  public balance: number;
  public keyPair: EC.KeyPair;
  public publicKey: any;
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex", false);
  }

  toString() {
    return `
    Wallet -
    publicKey: ${this.publicKey.toString()}
    balance: ${this.balance}
    `;
  }

  /**
   * @param dataHash the hash representation of some data
   * @returns the signed data
   */

  signData(dataHash: any) {
    return this.keyPair.sign(dataHash);
  }
}

export default Wallet;
