import { Request, Response } from "express";
import { calendarServiceInstance } from "../services";

//------------------------------------------------
export class CalendarController {
  private static instance: CalendarController;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new CalendarController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async loadContent(req: Request, res: Response) {
    return await calendarServiceInstance.loadContent(req, res);
  }
  async saveContent(req: Request, res: Response) {
    return await calendarServiceInstance.saveContent(req, res);
  }
  async syncContent(req: Request, res: Response) {
    return await calendarServiceInstance.syncContent(req, res);
  }
}

//------------------------------------------------
export const calendarsInstance = CalendarController.getInstance();
