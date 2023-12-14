import { Router } from "express";
import { dataInstance } from "../controller";

// -----------------------------------------------
const dataRouter = Router();
dataRouter.get("/load-content", dataInstance.loadContent);
dataRouter.post("/save-content", dataInstance.saveContent);
dataRouter.post("/sync-content", dataInstance.syncContent);
// -----------------------------------------------
export { dataRouter };
