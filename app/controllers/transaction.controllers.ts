import { Request, Response } from "express";
import Transaction from "../../wallet/transaction";
import { p2pServer, transactionPool, wallet } from "../utils/block-initializer";

/**
 * @param req request
 * @param res response
 * It returns all the transactions from the transaction pool
 */

export const getTransactionsFromPool = async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Here are the transactions!",
    data: transactionPool.transactions,
    totalTransactions: transactionPool.transactions.length,
  });
};

/**
 * @param req request
 * @param res response
 * It creates a new transaction and adds it to the transaction pool
 */

export const createTransaction = async (req: Request, res: Response) => {
  const { amount, recipient } = req.body;
  const transaction: Transaction = wallet.createTransaction(
    recipient,
    amount,
    transactionPool
  )!;
  p2pServer.broadcastTransaction(transaction);
  res.status(201).json({
    message: "Transaction created successfully!",
    data: transaction,
  });
};
