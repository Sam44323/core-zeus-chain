import { Request, Response } from "express";
import { transactionPool } from "../utils/block-initializer";

/**
 * @param req request
 * @param res response
 * It returns all the transactions from the transaction pool
 */

export const getTransactionsFromPool = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Here are the transactions!",
    data: transactionPool.transactions,
  });
};

/**
 * @param req request
 * @param res response
 * It creates a new transaction and adds it to the transaction pool
 */

export const createTransaction = async (req: Request, res: Response) => {};
