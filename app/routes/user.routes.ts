import { Router } from "express";
import { getUserPublicKey } from "../controllers/user.controllers";

const userRoutes = Router();
userRoutes.get("/publickKey", getUserPublicKey);

export default userRoutes;
