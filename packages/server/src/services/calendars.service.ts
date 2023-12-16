import dotenv from "dotenv";
import { Request, Response } from "express";
import { responseMessageInstance } from "../utils";
import { authPayload } from "../types";
import jwt from "jsonwebtoken";
import { datasource } from "../datasource";
dotenv.config();

//------------------------------------------------
export class CalendarService {
  private static instance: CalendarService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new CalendarService();
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
      const calendarsQuery = 'SELECT * FROM "Calendars" WHERE user_id = $1';
      const calendarsValues = [id];
      const calendarsResult = await datasource.query(
        calendarsQuery,
        calendarsValues
      );
      return responseMessageInstance.getSuccess(res, 200, "FETCHED", {
        calendars: calendarsResult.rows,
      });
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
      const existingCalendarsQuery =
        'SELECT id, name FROM "Calendars" WHERE user_id = $1';
      const existingCalendarsValues = [id];
      const existingCalendarsResult = await datasource.query(
        existingCalendarsQuery,
        existingCalendarsValues
      );

      for (const calendar of data) {
        const choosenDate = new Date(calendar.choosen_date);
        const ISOchoosenDate = choosenDate.toISOString();
        const notingTime = new Date(calendar.noting_time);
        const ISOnotingTime = notingTime.toISOString();

        if (choosenDate < new Date()) {
          return responseMessageInstance.getError(
            res,
            400,
            "Invalid date for calendar: " + calendar.name
          );
        }

        const existingCalendarIndex = existingCalendarsResult.rows.findIndex(
          (existingCalendar) => existingCalendar.id === calendar.id
        );

        if (existingCalendarIndex !== -1) {
          const updateCalendarQuery =
            'UPDATE "Calendars" SET name = $2, choosen_date = $3, notification = $4, noting_time = $5 WHERE id = $1';
          const updateCalendarValues = [
            existingCalendarsResult.rows[existingCalendarIndex].id,
            calendar.name,
            ISOchoosenDate,
            calendar.notification,
            ISOnotingTime,
          ];
          await datasource.query(updateCalendarQuery, updateCalendarValues);
        } else {
          const insertCalendarQuery =
            'INSERT INTO "Calendars" (user_id, name, choosen_date, notification, noting_time) VALUES ($1, $2, $3, $4, $5)';
          const insertCalendarValues = [
            id,
            calendar.name,
            ISOchoosenDate,
            calendar.notification,
            ISOnotingTime,
          ];
          await datasource.query(insertCalendarQuery, insertCalendarValues);
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
export const calendarServiceInstance = CalendarService.getInstance();
