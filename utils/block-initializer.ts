import Blockchain from "../core/blockchain";

let zeusBlockchain: Blockchain;

const chainInitializer = () => {
  zeusBlockchain = new Blockchain();
};

const getZeusBlockchain = () => zeusBlockchain;

export { chainInitializer, getZeusBlockchain };
