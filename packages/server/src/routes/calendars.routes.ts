import { Router } from "express";
import { calendarsInstance } from "../controller";
import { authenToken } from "../middlewares";

// -----------------------------------------------
const calendarRouter = Router();
calendarRouter.get("/load-content", authenToken, calendarsInstance.loadContent);
calendarRouter.post(
  "/save-content",
  authenToken,
  calendarsInstance.saveContent
);
calendarRouter.post(
  "/sync-content",
  authenToken,
  calendarsInstance.syncContent
);
// -----------------------------------------------
export { calendarRouter };
