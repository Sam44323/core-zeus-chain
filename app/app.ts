import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { chainInitializer } from "./utils/block-initializer";
import zeusChainRoute from "./routes/zeusChain.routes";
import transactionRoutes from "./routes/transactions.routes";
import userRoutes from "./routes/user.routes";
import logger from "./helper/winston_config";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/blocks", zeusChainRoute);
app.use("/transactions", transactionRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`✅ Server started on port: ${port}`);
  chainInitializer(); // initializing the instance of the blockchain
});
