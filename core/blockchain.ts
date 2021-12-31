import Block from "./block";

class Blockchain {
  public chain: Block[] = [];

  constructor() {
    this.chain = [Block.genesis()];
  }

  /**
   * @param data that is to be added to the newly mined block
   */

  addBlock(data: any) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
  }
}

export default Blockchain;
