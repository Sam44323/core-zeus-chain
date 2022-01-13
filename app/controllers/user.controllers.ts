import { Request, Response } from "express";
import Wallet from "../../wallet";
import { wallet } from "../utils/block-initializer";

export const getUserPublicKey = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Public key for the user",
    publicKey: wallet.publicKey,
  });
};
