import { Router } from "express";
import { mineBlock } from "../controllers/mine.controllers";

const mineRoutes = Router();

mineRoutes.get("/mineBlock", mineBlock);

export default mineRoutes;
