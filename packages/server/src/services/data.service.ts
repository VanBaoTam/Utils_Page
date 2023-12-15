import dotenv from "dotenv";
import { Request, Response } from "express";
import { responseMessageInstance } from "../utils";
dotenv.config();
//------------------------------------------------
export class DataService {
  private static instance: DataService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new DataService();
    }
    return this.instance;
  }

  // -----------------------------------------------
  async loadContent(req: Request, res: Response) {
    return responseMessageInstance.getSuccess(res, 200, "FETCHED", {});
  }
  async saveContent(req: Request, res: Response) {
    return responseMessageInstance.getSuccess(res, 200, "SAVED", {});
  }
  async syncContent(req: Request, res: Response) {
    return responseMessageInstance.getSuccess(res, 200, "SYNCED", {});
  }
}

//------------------------------------------------
export const dataServiceInstance = DataService.getInstance();
