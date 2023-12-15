import { Express } from "express";
import { userRouter } from "./user.routes";
import { dataRouter } from "./data.routes";
export const routes = (app: Express) => {
  app.use("/v1/api/users", userRouter);
  app.use("/v1/api/data", dataRouter);
};
