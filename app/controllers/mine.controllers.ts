import { Request, Response } from "express";
import { minerInstance } from "../utils/block-initializer";

export const mineBlock = async (req: Request, res: Response) => {
  const block = minerInstance.mint();
  res.status(200).send({
    message: "Block Mined Successfully",
    block,
  });
};
