import { Router } from "express";
import { getBlockData } from "../controllers/zeusChain.controllers";

const zeusChainRoutes = Router();
zeusChainRoutes.get("/blocks", getBlockData);

export default zeusChainRoutes;
