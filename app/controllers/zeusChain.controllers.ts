import { Request, Response } from "express";
import { getZeusBlockchain } from "../utils/block-initializer";

export const getBlockData = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Data for blockchain",
    data: getZeusBlockchain().chain,
  });
};
