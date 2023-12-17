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
  async forgotPassword(req: Request, res: Response) {
    return await userServiceInstance.forgotPassword(req, res);
  }
  async changeProfile(req: Request, res: Response) {
    return await userServiceInstance.changeProfile(req, res);
  }
  async updatePassword(req: Request, res: Response) {
    return await userServiceInstance.updatePassword(req, res);
  }
  async whoAmI(req: Request, res: Response) {
    return await userServiceInstance.whoAmI(req, res);
  }
}

//------------------------------------------------
export const userInstance = UserController.getInstance();
