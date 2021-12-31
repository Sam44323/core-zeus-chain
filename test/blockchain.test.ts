import Block from "../core/block";
import Blockchain from "../core/blockchain";

describe("Blockchain", () => {
  let bChain: Blockchain;
  let testChain: Blockchain; // chain for testing the validation

  beforeEach(() => {
    bChain = new Blockchain();
    testChain = new Blockchain();
  });

  it("starts with the genesis block", () => {
    expect(bChain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const data = "new-block-data";
    bChain.addBlock(data);
    expect(bChain.chain[bChain.chain.length - 1].data).toEqual(data);
  });

  it("validates the chain", () => {
    testChain.addBlock("test-data");
    expect(bChain.isValidChain(testChain.chain)).toBe(true);
  });

  it("invalidates a chain with wrong genesis block", () => {
    testChain.chain[0].data = "wrong-genesis-data";
    expect(bChain.isValidChain(testChain.chain)).toBe(false);
  });

  it("invalidates a corrupt chain", () => {
    testChain.addBlock("test-data");
    testChain.chain[1].data = "corrupt-data";

    expect(bChain.isValidChain(testChain.chain)).toBe(false);
  });
});
