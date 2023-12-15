import { Request, Response } from "express";
import { userServiceInstance } from "../services";

//------------------------------------------------
export class UserController {
  private static instance: UserController;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async login(req: Request, res: Response) {
    return await userServiceInstance.login(req, res);
  }
  async signup(req: Request, res: Response) {
    return await userServiceInstance.signup(req, res);
  }
}

//------------------------------------------------
export const userInstance = UserController.getInstance();
