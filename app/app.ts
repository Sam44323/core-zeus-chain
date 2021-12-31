import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { chainInitializer } from "../utils/block-initializer";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  chainInitializer();
});
