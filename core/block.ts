import { SHA256 } from "crypto-js";

const DIFFICULTY = 4;

class Block {
  /*
    @param: timestamp- the current time in seconds when the block will be created
    @param: lastHash- the hash of the previous block
    @param: hash- the hash of the current block
    @param: data- the data to be stored in the block
   */

  constructor(
    public timestamp: any,
    public prevHash: string,
    public ownHash: string,
    public data: any,
    public nonce: number
  ) {}

  /**
   * using (0,10) to print only the first 10 characters of the hash
   * @returns the value for the block
   */

  toString(): string {
    return `
    Block:
    --------------------
    Timestamp - ${this.timestamp}
    Last Hash - ${this.prevHash.substring(0, 10)}
    Hash - ${this.ownHash.substring(0, 10)}
    Data - ${this.data}
    `;
  }

  /**
   * @returns the block instance as genesis block for the initial data
   */

  static genesis(): Block {
    return new this("Genesis-time", "-----", "f1r57-sha956", [], 0);
  }

  /**
   *
   * @param lastBlock the previous mined block for the chain
   * @param data the data for the current block that is to be mined
   * @returns new mined block
   */

  static mineBlock(lastBlock: Block, data: any): Block {
    const timestamp = Date.now(); // getting the current time in epoch
    const hash = Block.hashGenerator(timestamp, lastBlock.ownHash, data);

    return new this(
      timestamp,
      lastBlock.ownHash,
      hash,
      data,
      lastBlock.nonce + 1
    );
  }
  /**
   *
   * @param timestamp the current time in seconds when the block will be created
   * @param prevBlock the previous block hash in the chain
   * @param data the data for the current block that is to be mined
   * @returns the hash of the block
   */
  static hashGenerator(
    timestamp: any,
    prevBlockHash: string,
    data: any
  ): string {
    return SHA256(timestamp + prevBlockHash + data).toString();
  }

  /**
   * util function for hash calculation
   * @param block the block for which we need to calculate the hash
   * @returns the hash for the block data
   */

  static generatedHash(block: Block): string {
    const { timestamp, prevHash, data } = block;
    return Block.hashGenerator(timestamp, prevHash, data);
  }
}

export default Block;
