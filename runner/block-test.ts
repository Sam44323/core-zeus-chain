import Block from "../core/block";

const firstBlock = Block.mineBlock(Block.genesis(), "first-data");
console.log(firstBlock.toString());