import { Express } from "express";
import { userRouter } from "./user.routes";
export const routes = (app: Express) => {
  app.use("/v1/api/users", userRouter);
};
