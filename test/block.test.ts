import Block from "../core/block";
import { DIFFICULTY } from "../utils/constants";

describe("Block", () => {
  let data, prevBlock: Block, block: Block;

  beforeEach(() => {
    data = "bar";
    prevBlock = Block.genesis();
    block = Block.mineBlock(prevBlock, data);
  });

  it("sets the `data` to match the input", () => {
    expect(block.data).toEqual(data);
  });

  it("sets the `prevHash` to match the hash of the previous block", () => {
    expect(block.prevHash).toEqual(prevBlock.ownHash);
  });

  it("generates a hash that matches the difficulty", () => {
    console.log(block);
    expect(block.ownHash.substring(0, DIFFICULTY)).toEqual(
      "0".repeat(DIFFICULTY)
    );
  });
});
