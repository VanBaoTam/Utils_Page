import { Request, Response } from "express";
import { noteServiceInstance } from "../services";

//------------------------------------------------
export class NoteController {
  private static instance: NoteController;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new NoteController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async loadContent(req: Request, res: Response) {
    return await noteServiceInstance.loadContent(req, res);
  }
  async saveContent(req: Request, res: Response) {
    return await noteServiceInstance.saveContent(req, res);
  }
  async syncContent(req: Request, res: Response) {
    return await noteServiceInstance.syncContent(req, res);
  }
}

//------------------------------------------------
export const notesInstance = NoteController.getInstance();
