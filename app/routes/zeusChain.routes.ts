import { Router } from "express";
import {
  addBlockData,
  getBlockData,
} from "../controllers/zeusChain.controllers";

const zeusChainRoutes = Router();
zeusChainRoutes.get("/getBlocks", getBlockData);
zeusChainRoutes.post("/addBlock", addBlockData);

export default zeusChainRoutes;
