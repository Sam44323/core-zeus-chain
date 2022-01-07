import { SHA256 } from "crypto-js";

const DIFFICULTY = 4;

class Block {
  /*
    @param: timestamp- the current time in seconds when the block will be created
    @param: lastHash- the hash of the previous block
    @param: hash- the hash of the current block
    @param: data- the data to be stored in the block
    @param: nonce- the nonce for the mined block
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
    Nonce - ${this.nonce}
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
    let timestamp: number;
    let hash: string;
    let nonce: number = 0;
    do {
      nonce++; // nonce will increase as long as we don't get the hash that has the required number of zeros
      timestamp = Date.now(); // getting the current time in epoch
      hash = Block.hashGenerator(
        timestamp,
        lastBlock.ownHash,
        data,
        lastBlock.nonce
      );
    } while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY)); // checking the hash for the required number of zeros

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
   * @param nonce the nonce for the current block
   * @returns the hash of the block
   */
  static hashGenerator(
    timestamp: any,
    prevBlockHash: string,
    data: any,
    nonce: number
  ): string {
    return SHA256(timestamp + prevBlockHash + data + nonce).toString();
  }

  /**
   * util function for hash calculation
   * @param block the block for which we need to calculate the hash
   * @returns the hash for the block data
   */

  static generatedHash(block: Block): string {
    const { timestamp, prevHash, data, nonce } = block;
    return Block.hashGenerator(timestamp, prevHash, data, nonce);
  }
}

export default Block;
