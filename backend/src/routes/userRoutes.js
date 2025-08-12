import express from "express";
import { logout, login, signup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
