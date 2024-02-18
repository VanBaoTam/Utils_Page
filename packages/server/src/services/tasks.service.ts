import dotenv from "dotenv";
import { Request, Response } from "express";
import { responseMessageInstance } from "../utils";
import { authPayload } from "../types";
import jwt from "jsonwebtoken";
import { datasource } from "../datasource";
dotenv.config();

//------------------------------------------------
export class TaskService {
  private static instance: TaskService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new TaskService();
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
      const tasksQuery = 'SELECT * FROM "Tasks" WHERE user_id = $1';
      const tasksValues = [id];
      const tasksResult = await datasource.query(tasksQuery, tasksValues);
      if (tasksResult.rowCount === 0) {
        return responseMessageInstance.getError(
          res,
          404,
          "You have nothing to load. "
        );
      }
      return responseMessageInstance.getSuccess(
        res,
        200,
        "Load datasuccessfully!",
        {
          tasks: tasksResult.rows,
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
      const existingTasksQuery =
        'SELECT id, name FROM "Tasks" WHERE user_id = $1';
      const existingTasksValues = [id];
      const existingTasksResult = await datasource.query(
        existingTasksQuery,
        existingTasksValues
      );

      for (const task of data) {
        const createDate = new Date(task.created_date);
        const ISOcreateDate = createDate.toISOString();
        const startDate = new Date(task.started_date);
        const ISOstartDate = startDate.toISOString();
        const notingDate = new Date(task.noting_date);
        const ISOnotingDate = notingDate.toISOString();
        const finishedDate = new Date(task.finished_date);
        const ISOfinishedDate = finishedDate.toISOString();

        if (!(startDate < notingDate && notingDate < finishedDate)) {
          return responseMessageInstance.getError(
            res,
            400,
            "Invalid date order for task: " + task.name
          );
        }

        const existingTaskIndex = existingTasksResult.rows.findIndex(
          (existingTask) => existingTask.id === task.id
        );

        if (existingTaskIndex !== -1) {
          const updateTaskQuery =
            'UPDATE "Tasks" SET name = $2, description = $3, status = $4, created_date = $5, started_date = $6, noting_date = $7, finished_date = $8 WHERE id = $1';
          const updateTaskValues = [
            existingTasksResult.rows[existingTaskIndex].id,
            task.name,
            task.description,
            task.status,
            ISOcreateDate,
            ISOstartDate,
            ISOnotingDate,
            ISOfinishedDate,
          ];
          await datasource.query(updateTaskQuery, updateTaskValues);
        } else {
          const insertTaskQuery =
            'INSERT INTO "Tasks" (user_id, name, description, status, created_date, started_date, noting_date, finished_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
          const insertTaskValues = [
            id,
            task.name,
            task.description,
            task.status,
            ISOcreateDate,
            ISOstartDate,
            ISOnotingDate,
            ISOfinishedDate,
          ];
          await datasource.query(insertTaskQuery, insertTaskValues);
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
export const taskServiceInstance = TaskService.getInstance();
