import Block from "./block";

/**
 * The main chain class for creating chain of blocks
 */

class Blockchain {
  public chain: Block[] = [];

  constructor() {
    this.chain = [Block.genesis()];
  }

  /**
   * @param data that is to be added to the newly mined block
   */

  addBlock(data: any): Block {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  /**
   *
   * @param chain that is to be verified and replaced if valid
   * @returns whether the chain is valid or not
   */

  isValidChain(chain: any) {
    /**
     * As two objects cant be equal, so we are stringifying the genesis chain and comparing it with the stringified chain
     */
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
  }
}

export default Blockchain;
