import { Router } from "express";
import { dataInstance } from "../controller";
import { authenToken } from "../middlewares";

// -----------------------------------------------
const dataRouter = Router();
dataRouter.get("/load-content", authenToken, dataInstance.loadContent);
dataRouter.post("/save-content", authenToken, dataInstance.saveContent);
dataRouter.post("/sync-content", authenToken, dataInstance.syncContent);
// -----------------------------------------------
export { dataRouter };
