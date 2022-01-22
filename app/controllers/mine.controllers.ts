import { Request, Response } from "express";
import { minerInstance } from "../utils/block-initializer";
import logger from "../helper/winston_config";
import Block from "../../core/block";

export const mineBlock = async (_req: Request, res: Response) => {
  const block: Block = minerInstance.mint();
  logger.info(
    `Time [${new Date().toLocaleString()}] [ACTION] [Mine-Controller] [Block-Creation] ✅ Mined a new block
    ${block.toString()}`
  );
  res.status(200).json({
    message: "Block mined successfully!",
  });
};
