import { Router } from "express";
import { getTransactionsFromPool } from "../controllers/transaction.controllers";

const transactionRoutes = Router();

transactionRoutes.get("/getTransactions", getTransactionsFromPool);

export default transactionRoutes;
