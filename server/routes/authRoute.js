import express from "express";
import { goggleAuth, logOut } from "../controllers/authController.js"

const authRouter = express.Router();

 authRouter.post("/register",goggleAuth)
 authRouter.get("/logout",logOut)

 export default authRouter;