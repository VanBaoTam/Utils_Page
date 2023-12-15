import { Request, Response } from "express";
import { dataServiceInstance } from "../services";

//------------------------------------------------
export class DataController {
  private static instance: DataController;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new DataController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async loadContent(req: Request, res: Response) {
    return await dataServiceInstance.loadContent(req, res);
  }
  async saveContent(req: Request, res: Response) {
    return await dataServiceInstance.saveContent(req, res);
  }
  async syncContent(req: Request, res: Response) {
    return await dataServiceInstance.syncContent(req, res);
  }
}

//------------------------------------------------
export const dataInstance = DataController.getInstance();
