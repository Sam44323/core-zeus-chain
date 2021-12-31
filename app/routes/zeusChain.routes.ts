import { Router } from "express";

const zeusChainRoutes = Router();
zeusChainRoutes.get("/blocks");

export default zeusChainRoutes;
