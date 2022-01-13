import { Router } from "express";
import { getUserPublicKey } from "../controllers/user.controllers";

const userRoutes = Router();
userRoutes.get("/publicKey", getUserPublicKey);

export default userRoutes;
