import Block from "./block";

const block = new Block("foo", "bar", "baz", "qux");
console.log(block.toString());
console.log(Block.genesis().toString());
