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

    // checking the hash generated for each block and also checking whether the data is tampering or not by generating the hash for each block

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.prevHash !== lastBlock.ownHash ||
        block.ownHash !== Block.generatedHash(block)
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Method for replacing the current chain with the new longest chain which is validated
   * @param newChain that is to be validated and replaced if valid
   */

  replaceChain(newChain: Blockchain) {
    if (newChain.chain.length <= this.chain.length) {
      console.log("Received chain is not longer than the current chain.");
      return;
    } else if (!this.isValidChain(newChain.chain)) {
      console.log("Received chain is not valid.");
      return;
    }

    console.log("Replacing the current chain with the new chain!");
    this.chain = newChain.chain;
  }
}

export default Blockchain;
