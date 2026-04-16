import express from "express";
import { userSignIn, userSignUp } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signUp", userSignUp);
userRouter.post("/signIn", userSignIn);

export default userRouter