import { Router } from "express";
import {
  getTransactionsFromPool,
  createTransaction,
} from "../controllers/transaction.controllers";

const transactionRoutes = Router();

transactionRoutes.get("/getTransactions", getTransactionsFromPool);
transactionRoutes.post("/createTransaction", createTransaction);

export default transactionRoutes;
