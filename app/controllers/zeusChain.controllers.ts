import { Request, Response } from "express";
import {
  getZeusBlockchain,
  addNewBlock,
  p2pServer,
} from "../utils/block-initializer";

/**
 * @param req request
 * @param res response
 * It returns the blockchain data
 */

export const getBlockData = (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Data for blockchain",
    data: getZeusBlockchain().chain,
  });
};

/**
 * @param req request
 * @param res response
 * adds a new block to the blockchain and returns the new blockchain data
 */

export const addBlockData = (req: Request, res: Response) => {
  const { data } = req.body;
  if (!data) {
    res.status(400).json({
      message: "Data is required",
    });
  } else {
    addNewBlock(data);
    p2pServer.syncChains(); // syncing the chains for the peers
    res.status(200).json({
      message: "Block added",
      data: getZeusBlockchain().chain,
    });
  }
};
