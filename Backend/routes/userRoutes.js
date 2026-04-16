import express from "express";
import { userSignIn, userSignUp, userLogout } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signUp", userSignUp);
userRouter.post("/signIn", userSignIn);
userRouter.post("/logout", userLogout);

export default userRouter