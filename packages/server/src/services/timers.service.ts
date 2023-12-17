import dotenv from "dotenv";
import { Request, Response } from "express";
import { responseMessageInstance } from "../utils";
import { authPayload } from "../types";
import jwt from "jsonwebtoken";
import { datasource } from "../datasource";
dotenv.config();

//------------------------------------------------
export class TimerService {
  private static instance: TimerService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new TimerService();
    }
    return this.instance;
  }

  // -----------------------------------------------
  async loadContent(req: Request, res: Response) {
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

    try {
      const timersQuery = 'SELECT * FROM "Timers" WHERE user_id = $1';
      const timersValues = [id];
      const timersResult = await datasource.query(timersQuery, timersValues);
      if (timersResult.rowCount === 0) {
        return responseMessageInstance.getError(
          res,
          404,
          "You have nothing to load. "
        );
      }
      return responseMessageInstance.getSuccess(
        res,
        200,
        "Load datas successfully!",
        {
          timers: timersResult.rows,
        }
      );
    } catch (error) {
      console.error("[loadContent]: getError", error);
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }

  async saveContent(req: Request, res: Response) {
    const { data } = req.body ?? {};

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

    if (!data) {
      return responseMessageInstance.getError(res, 400, "Invalid data!");
    }

    if (!Array.isArray(data) || data.length === 0) {
      return responseMessageInstance.getError(
        res,
        400,
        "Data must be a non-empty array!"
      );
    }

    try {
      const existingTimersQuery =
        'SELECT id, title FROM "Timers" WHERE user_id = $1';
      const existingTimersValues = [id];
      const existingTimersResult = await datasource.query(
        existingTimersQuery,
        existingTimersValues
      );

      for (const timer of data) {
        const existingTimerIndex = existingTimersResult.rows.findIndex(
          (existingTimer) => existingTimer.id === timer.id
        );

        if (existingTimerIndex !== -1) {
          const updateTimerQuery =
            'UPDATE "Timers" SET choosen_days = $2, repeater = $3, title = $4, noting_time = $5 WHERE id = $1';
          const updateTimerValues = [
            existingTimersResult.rows[existingTimerIndex].id,
            timer.choosen_days,
            timer.repeater,
            timer.title,
            timer.noting_time,
          ];
          await datasource.query(updateTimerQuery, updateTimerValues);
        } else {
          const insertTimerQuery =
            'INSERT INTO "Timers" (user_id, choosen_days, repeater, title, noting_time) VALUES ($1, $2, $3, $4, $5)';
          const insertTimerValues = [
            id,
            timer.choosen_days,
            timer.repeater,
            timer.title,
            timer.noting_time,
          ];
          await datasource.query(insertTimerQuery, insertTimerValues);
        }
      }

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Save Successfully",
        {}
      );
    } catch (error) {
      console.error("[saveContent]: getError", error);
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }

  async syncContent(req: Request, res: Response) {
    return responseMessageInstance.getSuccess(res, 200, "SYNCED", {});
  }
}

//------------------------------------------------
export const timerServiceInstance = TimerService.getInstance();
