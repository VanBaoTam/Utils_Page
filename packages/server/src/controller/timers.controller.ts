import { Request, Response } from "express";
import { timerServiceInstance } from "../services";

//------------------------------------------------
export class TimerController {
  private static instance: TimerController;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new TimerController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async loadContent(req: Request, res: Response) {
    return await timerServiceInstance.loadContent(req, res);
  }
  async saveContent(req: Request, res: Response) {
    return await timerServiceInstance.saveContent(req, res);
  }
  async syncContent(req: Request, res: Response) {
    return await timerServiceInstance.syncContent(req, res);
  }
}

//------------------------------------------------
export const timersInstance = TimerController.getInstance();
