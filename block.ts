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
    public data: any
  ) {}

  /**
   * using 0,10 to print only the first 10 characters of the hash
   * @returns the value for the block
   */

  toString = () => {
    return `
    Block:
    --------------------
    Timestamp - ${this.timestamp}
    Last Hash - ${this.prevHash.substring(0, 10)}
    Hash - ${this.ownHash.substring(0, 10)}
    Data - ${this.data}
    `;
  };

  /**
   * @returns the block instance as genesis block for the initial data
   */

  static genesis(): Block {
    return new this("Genesis-time", "-----", "f1r57-sha956", []);
  }

  static mineBlock(lastBlock: Block, data: any): Block {
    const timestamp = Date.now(); // get the current time in epoch
    const lastHash = lastBlock.ownHash; // get the hash of the previous block
    const hash = "todo-hash";

    return new this(timestamp, lastHash, hash, data);
  }
}

export default Block;
