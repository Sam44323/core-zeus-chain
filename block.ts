class Block {
  /*
    @param: timestamp- the current time in seconds when the block will be created
    @param: lastHash- the hash of the previous block
    @param: hash- the hash of the current block
    @param: data- the data to be stored in the block
   */

  constructor(
    public timestamp: string,
    public prevHash: string,
    public ownHash: string,
    public data: string
  ) {}

  /**
   * @returns the value for the block
   */

  toString = () => {
    return `
    Block-
    Timestamp - ${this.timestamp}
    Last Hash - ${this.prevHash}
    Hash - ${this.ownHash}
    Data - ${this.data}
    `;
  };
}
