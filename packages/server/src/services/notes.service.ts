import dotenv from "dotenv";
import { Request, Response } from "express";
import { responseMessageInstance } from "../utils";
import { authPayload } from "../types";
import jwt from "jsonwebtoken";
import { datasource } from "../datasource";
dotenv.config();

//------------------------------------------------
export class NoteService {
  private static instance: NoteService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new NoteService();
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
      const notesQuery = 'SELECT * FROM "Notes" WHERE user_id = $1';
      const notesValues = [id];
      const notesResult = await datasource.query(notesQuery, notesValues);
      return responseMessageInstance.getSuccess(res, 200, "FETCHED NOTES", {
        notes: notesResult.rows,
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
      const existingNotesQuery =
        'SELECT id, name FROM "Notes" WHERE user_id = $1';
      const existingNotesValues = [id];
      const existingNotesResult = await datasource.query(
        existingNotesQuery,
        existingNotesValues
      );

      for (const note of data) {
        const updatedDate = new Date(note.updated_date);
        const ISOupdatedDate = updatedDate.toISOString();

        const existingNoteIndex = existingNotesResult.rows.findIndex(
          (existingNote) => existingNote.id === note.id
        );

        if (existingNoteIndex !== -1) {
          const updateNoteQuery =
            'UPDATE "Notes" SET name = $2, content = $3, status = $4, updated_date = $5 WHERE id = $1';
          const updateNoteValues = [
            existingNotesResult.rows[existingNoteIndex].id,
            note.name,
            note.content,
            note.status,
            ISOupdatedDate,
          ];
          await datasource.query(updateNoteQuery, updateNoteValues);
        } else {
          const insertNoteQuery =
            'INSERT INTO "Notes" (user_id, name, content, status, updated_date) VALUES ($1, $2, $3, $4, $5)';
          const insertNoteValues = [
            id,
            note.name,
            note.content,
            note.status,
            ISOupdatedDate,
          ];
          await datasource.query(insertNoteQuery, insertNoteValues);
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
export const noteServiceInstance = NoteService.getInstance();
