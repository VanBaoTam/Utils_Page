import { Request, Response, NextFunction } from "express";
import { responseMessageInstance } from "../utils";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//------------------------------------
export function authenToken(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers["authorization"] ?? "";
  if (!authorizationHeader) {
    return responseMessageInstance.getError(res, 401, "Unauthorized");
  }

  let token = "";
  if (authorizationHeader.includes(" ")) {
    token = authorizationHeader.split(" ")[1];
  } else {
    return responseMessageInstance.getError(res, 401, "Unauthorized");
  }

  let isTokenValid = true;
  jwt.verify(token, process.env.SECRET_KEY, (error) => {
    if (error) {
      isTokenValid = false;
    }
  });

  if (!isTokenValid) {
    return responseMessageInstance.getError(res, 403, "Forbidden");
  }
  next();
}
