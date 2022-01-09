import ChainUtil from "../utils/chain-util";

class Transaction {
  public id: string = "";
  public input: any;
  public output: any;

  constructor() {
    this.id = ChainUtil.getUniqueId();
    this.input = null;
    this.output = [];
  }
}

export default Transaction;
