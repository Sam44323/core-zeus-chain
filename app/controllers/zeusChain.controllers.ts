import { Request, Response } from "express";
import { getZeusBlockchain, addNewBlock } from "../utils/block-initializer";

export const getBlockData = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Data for blockchain",
    data: getZeusBlockchain().chain,
  });
};

export const addBlockData = (req: Request, res: Response) => {
  const { data } = req.body;
  if (!data) {
    res.status(400).json({
      message: "Data is required",
    });
  } else {
    addNewBlock(data);
    res.status(200).json({
      message: "Block added",
      data: getZeusBlockchain().chain,
    });
  }
};
