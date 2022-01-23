import { Router } from "express";
import { getUserPublicKey, getBalance } from "../controllers/user.controllers";

const userRoutes = Router();
userRoutes.get("/publicKey", getUserPublicKey);
userRoutes.get("/getBalance", getBalance);

export default userRoutes;
