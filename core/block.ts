import { SHA256 } from "crypto-js";
import { DIFFICULTY, MINE_RATE } from "../utils/constants";

class Block {
  /*
    @param: timestamp- the current time in seconds when the block will be created
    @param: lastHash- the hash of the previous block
    @param: hash- the hash of the current block
    @param: data- the data to be stored in the block
    @param: nonce- the nonce for the mined block
    @param: difficulty- the difficulty value when mining the block
   */

  constructor(
    public timestamp: any,
    public prevHash: string,
    public ownHash: string,
    public data: any,
    public nonce: number,
    public difficulty: number = DIFFICULTY
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
    Difficulty - ${this.difficulty}
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
    let { difficulty } = lastBlock;
    do {
      nonce++; // nonce will increase as long as we don't get the hash that has the required number of zeros
      timestamp = Date.now(); // getting the current time in epoch
      difficulty = Block.adjustDifficulty(lastBlock, timestamp); // for getting the difficulty value of the block

      hash = Block.hashGenerator(
        timestamp,
        lastBlock.ownHash,
        data,
        nonce,
        difficulty
      );
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty)); // checking the hash for the required number of zeros based on the difficulty value

    return new this(
      timestamp,
      lastBlock.ownHash,
      hash,
      data,
      nonce,
      difficulty
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
    nonce: number,
    difficulty: number
  ): string {
    return SHA256(
      timestamp + prevBlockHash + data + nonce + difficulty
    ).toString();
  }

  /**
   * util function for hash calculation
   * @param block the block for which we need to calculate the hash
   * @returns the hash for the block data
   */

  static generatedHash(block: Block): string {
    const { timestamp, prevHash, data, nonce, difficulty } = block;
    return Block.hashGenerator(timestamp, prevHash, data, nonce, difficulty);
  }

  /**
   *
   * @param lastBlock the previous block in the chain
   * @param currentTime the current time taken for generating the hash(need not to be correct per-se)
   * @returns the difficulty value based on that
   */

  static adjustDifficulty(lastBlock: Block, currentTime: number): number {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }
}

export default Block;
