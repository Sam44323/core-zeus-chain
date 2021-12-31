import Block from "../core/block";
import Blockchain from "../core/blockchain";

describe("Blockchain", () => {
  let bChain: Blockchain;

  beforeEach(() => {
    bChain = new Blockchain();
  });

  it("starts with the genesis block", () => {
    expect(bChain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const data = "new-block-data";
    bChain.addBlock(data);
    expect(bChain.chain[bChain.chain.length - 1].data).toEqual(data);
  });
});
