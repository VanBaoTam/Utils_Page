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
import { authPayload } from "../types";
import emailjs from "emailjs-com";
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
      const dataQuery = 'SELECT id,name FROM "User" WHERE username = $1';
      const dataValues = [username];
      const dataResult = await datasource.query(dataQuery, dataValues);
      if (!dataResult.rows[0]) {
        return responseMessageInstance.getError(res, 404, "User not found!");
      }
      const data = {
        id: dataResult.rows[0].id,
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
          name: dataResult.rows[0].name,
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
  async changeProfile(req: Request, res: Response) {
    const { password, name }: IRegister = req.body ?? {};
    const authorizationHeader = req.headers["authorization"] ?? "";
    const token = authorizationHeader.split(" ")[1];
    let id: number;
    jwt.verify(token, process.env.SECRET_KEY, (error, decodedData) => {
      if (error) {
        return responseMessageInstance.getError(res, 401, "Unauthorized!");
      }
      const payload = decodedData as authPayload;
      if (!payload.id || payload.id <= 0) {
        return responseMessageInstance.getError(res, 401, "Unauthorized!");
      }
      id = payload.id;
    });
    if (!password && !name) {
      return responseMessageInstance.getError(res, 400, "No changes provided");
    }

    const isValidCredentials =
      (!password ||
        CredentialsValidation(ETypeValidation.password, password)) &&
      (!name || CredentialsValidation(ETypeValidation.name, name));

    if (!isValidCredentials) {
      return responseMessageInstance.getError(res, 400, "Invalid Credentials");
    }

    try {
      const authQuery = 'SELECT name,password FROM "User" WHERE id = $1';
      const authValues = [id];
      const authResult = await datasource.query(authQuery, authValues);

      if (!authResult.rows.length) {
        return responseMessageInstance.getError(res, 400, "Account not found!");
      }

      const existingPassword = authResult.rows[0].password;
      const existingName = authResult.rows[0].name;
      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : existingPassword;
      const updatedName = name || existingName;
      const updateQuery =
        'UPDATE "User" SET password = $1, name = $2 WHERE id = $3';
      const updateValues = [hashedPassword, updatedName, id];
      await datasource.query(updateQuery, updateValues);
      return responseMessageInstance.getSuccess(
        res,
        200,
        "Profile updated successfully",
        {}
      );
    } catch (error) {
      console.error("[changeProfile]: getError", error);
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email }: { email: string } = req.body ?? {};

      if (!email || !CredentialsValidation(ETypeValidation.email, email)) {
        return responseMessageInstance.getError(res, 400, "Invalid Email");
      }

      const userQuery = 'SELECT id, name FROM "User" WHERE email = $1';
      const userValues = [email];
      const userResult = await datasource.query(userQuery, userValues);

      if (!userResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Account with this email does not exist"
        );
      }

      const userId = userResult.rows[0].id;
      const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "30m",
      });

      const emailParams = {
        to_email: email,
        from_name: "Utils Page",
        to_name: userResult.rows[0].name,
        message: `Click the following link to reset your password: http://localhost:5173/forgot-password/?token=${token}`,
        subject: "Password Reset Instructions",
        reply_to: email,
      };

      await emailjs.send(
        "service_30v0ikz",
        "template_fi2wf3k",
        emailParams,
        "il9QG9B7XFL3sfpV0"
      );

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Password reset instructions sent to your email!",
        {}
      );
    } catch (error) {
      console.error("[forgotPassword]: getError", error);
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { password, id }: { password: string; id: number } = req.body ?? {};
      if (
        !password ||
        !CredentialsValidation(ETypeValidation.password, password)
      ) {
        return responseMessageInstance.getError(res, 400, "Invalid Password");
      }

      const userQuery = 'SELECT id, name, password FROM "User" WHERE id = $1';
      const userValues = [id];
      const userResult = await datasource.query(userQuery, userValues);

      if (!userResult.rows.length) {
        return responseMessageInstance.getError(
          res,
          400,
          "Account with this ID does not exist"
        );
      }

      const existingPassword = userResult.rows[0].password;
      const isPasswordMatch = await bcrypt.compare(password, existingPassword);

      if (isPasswordMatch) {
        return responseMessageInstance.getError(
          res,
          400,
          "New password should be different from the existing password"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const updateQuery = 'UPDATE "User" SET password = $1 WHERE id = $2';
      const updateValues = [hashedPassword, id];
      await datasource.query(updateQuery, updateValues);

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Password updated successfully!",
        {}
      );
    } catch (error) {
      console.error("[updatePassword]: getError", error);
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
