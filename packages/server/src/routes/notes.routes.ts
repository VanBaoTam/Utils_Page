import { Router } from "express";
import { notesInstance } from "../controller";
import { authenToken } from "../middlewares";

// -----------------------------------------------
const noteRouter = Router();
noteRouter.get("/load-content", authenToken, notesInstance.loadContent);
noteRouter.post("/save-content", authenToken, notesInstance.saveContent);
noteRouter.post("/sync-content", authenToken, notesInstance.syncContent);
// -----------------------------------------------
export { noteRouter };
