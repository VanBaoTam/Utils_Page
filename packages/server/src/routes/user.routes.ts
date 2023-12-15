import { Router } from "express";
import { userInstance } from "../controller";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/sign-in", userInstance.login);
userRouter.post("/sign-up", userInstance.signup);

// -----------------------------------------------
export { userRouter };
