import { Request, Response } from "express";
import { wallet } from "../utils/block-initializer";

export const getUserPublicKey = async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Public key for the user",
    publicKey: wallet.publicKey,
  });
};

export const getBalance = async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Balance of the user",
    balance: wallet.balance,
  });
};
