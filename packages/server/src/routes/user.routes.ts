import { Router } from "express";
import { userInstance } from "../controller";
import { authenToken } from "../middlewares";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/sign-in", userInstance.login);
userRouter.post("/sign-up", userInstance.signup);
userRouter.post("/change-profile", authenToken, userInstance.changeProfile);
userRouter.post("/forgot-password", authenToken, userInstance.forgotPassword);
userRouter.post("/update-password", authenToken, userInstance.updatePassword);
// -----------------------------------------------
export { userRouter };
