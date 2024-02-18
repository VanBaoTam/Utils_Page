import { Router } from "express";
import { tasksInstance } from "../controller";
import { authenToken } from "../middlewares";

// -----------------------------------------------
const taskRouter = Router();
taskRouter.get("/load-content", authenToken, tasksInstance.loadContent);
taskRouter.post("/save-content", authenToken, tasksInstance.saveContent);
taskRouter.post("/sync-content", authenToken, tasksInstance.syncContent);
// -----------------------------------------------
export { taskRouter };
