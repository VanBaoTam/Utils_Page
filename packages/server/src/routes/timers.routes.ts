import { Router } from "express";
import { timersInstance } from "../controller";
import { authenToken } from "../middlewares";

// -----------------------------------------------
const timerRouter = Router();
timerRouter.get("/load-content", authenToken, timersInstance.loadContent);
timerRouter.post("/save-content", authenToken, timersInstance.saveContent);
timerRouter.post("/sync-content", authenToken, timersInstance.syncContent);
// -----------------------------------------------
export { timerRouter };
