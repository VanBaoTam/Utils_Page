import { Request, Response } from "express";
import {
  CredentialsValidation,
  ETypeValidation,
  ILogin,
  IRegister,
} from "../constants";
import { datasource } from "../datasource/index";
import { responseMessageInstance } from "../utils/index";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
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
    const isValidCredentials =
      CredentialsValidation(ETypeValidation.password, password) &&
      CredentialsValidation(ETypeValidation.username, username);

    if (!isValidCredentials) {
      return responseMessageInstance.getError(res, 400, "Invalid Credentials");
    }
    try {
      const authQuery = 'SELECT password FROM "User" WHERE username = $1';
      const authValues = [username];
      const authResult = await datasource.query(authQuery, authValues);
      if (!authResult.rows.length) {
        return responseMessageInstance.getError(res, 404, "User not found!");
      }

      const storedPassword = authResult.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (!passwordMatch) {
        return responseMessageInstance.getError(
          res,
          401,
          "Username or Password is wrong!"
        );
      }
      const dataQuery = 'SELECT password FROM "User" WHERE username = $1';
      const dataValues = [username];
      const dataResult = await datasource.query(dataQuery, dataValues);
      if (!dataResult.rows[0]) {
        return responseMessageInstance.getError(res, 404, "User not found!");
      }
      const data = {
        id: dataResult.rows[0].id,
        name: dataResult.rows[0].name,
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

    const isValidCredentials =
      CredentialsValidation(ETypeValidation.email, email) &&
      CredentialsValidation(ETypeValidation.password, password) &&
      CredentialsValidation(ETypeValidation.name, name) &&
      CredentialsValidation(ETypeValidation.username, username);

    if (!isValidCredentials) {
      return responseMessageInstance.getError(res, 400, "Invalid Credentials");
    }

    try {
      const authQuery =
        'SELECT id FROM "User" WHERE username = $1 OR email = $2';
      const authValues = [username, email];
      const authResult = await datasource.query(authQuery, authValues);

      if (authResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Account already exists"
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery =
        'INSERT INTO public."User"(username, email, password, name) VALUES ($1, $2, $3, $4) RETURNING id;';
      const insertValues = [username, email, hashedPassword, name];
      const roleResult = await datasource.query(insertQuery, insertValues);

      if (!roleResult.rows.length) {
        return responseMessageInstance.getError(res, 400, "Failed Signup");
      }

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Sign Up Successfully",
        {}
      );
    } catch (error) {
      console.error("[signup]: getError", error);
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
