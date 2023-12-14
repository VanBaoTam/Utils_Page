import { Request, Response } from "express";
import { ILogin, IRegister } from "../constants";
import { datasource } from "../datasource/index";
import { responseMessageInstance } from "../utils/index";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//------------------------------------------------
export class UserService {
  private static instance: UserService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  // -----------------------------------------------
  async login(req: Request, res: Response) {
    const { username, password }: ILogin = req.body ?? {};
    if (!username || !password) {
      return responseMessageInstance.getError(
        res,
        400,
        "Invalid Username or Password"
      );
    }

    try {
      const authQuery =
        'SELECT role_id,id FROM "User" WHERE username = $1 AND password = $2';
      const authValues = [username, password];
      const authResult = await datasource.query(authQuery, authValues);

      if (!authResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          401,
          "Invalid Username or Password"
        );
      }

      const roleId = authResult.rows?.[0]?.role_id;
      const roleQuery = 'SELECT role_name FROM "Role" WHERE id = $1';
      const roleResult = await datasource.query(roleQuery, [roleId]);

      if (!roleResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Failed Getting Roles"
        );
      }

      const permissionQuery = `
        SELECT allow
        FROM "Permission"
        JOIN "RolePermissionMapping" ON "Permission".id = "RolePermissionMapping".permission_id
        WHERE "RolePermissionMapping".role_id = $1
      `;

      const permissionResult = await datasource.query(permissionQuery, [
        roleId,
      ]);

      if (!permissionResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Failed Getting Permissions"
        );
      }
      const data = {
        userId: authResult.rows?.[0]?.id,
        fullName: authResult.rows?.[0]?.fullname,
        role: roleResult.rows?.[0]?.role_name,
        permissions: permissionResult.rows,
      };

      const token = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Login Successfully",
        {
          token: { value: token, type: "Bearer" },
          userId: authResult.rows?.[0]?.id,
        }
      );
    } catch (error) {
      console.error("[login]: getError", error);
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }
  async signup(req: Request, res: Response) {
    const { username, password, name, email }: IRegister = req.body ?? {};
    if (!username || !password || !name || !email) {
      return responseMessageInstance.getError(res, 400, "Invalid Credentials");
    }

    try {
      const authQuery =
        'SELECT role_id,id FROM "User" WHERE username = $1 AND password = $2';
      const authValues = [username, password];
      const authResult = await datasource.query(authQuery, authValues);

      if (!authResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          401,
          "Invalid Username or Password"
        );
      }

      const roleId = authResult.rows?.[0]?.role_id;
      const roleQuery = 'SELECT role_name FROM "Role" WHERE id = $1';
      const roleResult = await datasource.query(roleQuery, [roleId]);

      if (!roleResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Failed Getting Roles"
        );
      }

      const permissionQuery = `
        SELECT allow
        FROM "Permission"
        JOIN "RolePermissionMapping" ON "Permission".id = "RolePermissionMapping".permission_id
        WHERE "RolePermissionMapping".role_id = $1
      `;

      const permissionResult = await datasource.query(permissionQuery, [
        roleId,
      ]);

      if (!permissionResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Failed Getting Permissions"
        );
      }
      const data = {
        userId: authResult.rows?.[0]?.id,
        fullName: authResult.rows?.[0]?.fullname,
        role: roleResult.rows?.[0]?.role_name,
        permissions: permissionResult.rows,
      };

      const token = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Login Successfully",
        {
          token: { value: token, type: "Bearer" },
          userId: authResult.rows?.[0]?.id,
        }
      );
    } catch (error) {
      console.error("[login]: getError", error);
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }
}

//------------------------------------------------
export const userServiceInstance = UserService.getInstance();
