import { Router } from "express";
import { getBlockData } from "../controllers/zeusChain.controllers";

const zeusChainRoutes = Router();
zeusChainRoutes.get("/getBlocks", getBlockData);

export default zeusChainRoutes;
