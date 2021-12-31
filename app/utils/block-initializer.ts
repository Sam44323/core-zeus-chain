import Blockchain from "../../core/blockchain";

let zeusBlockchain: Blockchain;

const chainInitializer = () => {
  zeusBlockchain = new Blockchain();
};

const getZeusBlockchain = () => zeusBlockchain;

const addNewBlock = (data: any) => zeusBlockchain.addBlock(data);

export { chainInitializer, getZeusBlockchain, addNewBlock };
