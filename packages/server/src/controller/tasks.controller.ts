import { Request, Response } from "express";
import { taskServiceInstance } from "../services";

//------------------------------------------------
export class TaskController {
  private static instance: TaskController;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new TaskController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async loadContent(req: Request, res: Response) {
    return await taskServiceInstance.loadContent(req, res);
  }
  async saveContent(req: Request, res: Response) {
    return await taskServiceInstance.saveContent(req, res);
  }
  async syncContent(req: Request, res: Response) {
    return await taskServiceInstance.syncContent(req, res);
  }
}

//------------------------------------------------
export const tasksInstance = TaskController.getInstance();
