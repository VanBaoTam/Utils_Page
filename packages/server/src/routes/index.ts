import { Express } from "express";
import { userRouter } from "./user.routes";
import { taskRouter } from "./tasks.routes";
import { noteRouter } from "./notes.routes";
import { timerRouter } from "./timers.routes";
import { calendarRouter } from "./calendars.routes";
export const routes = (app: Express) => {
  app.use("/v1/api/users", userRouter);
  app.use("/v1/api/tasks", taskRouter);
  app.use("/v1/api/notes", noteRouter);
  app.use("/v1/api/timers", timerRouter);
  app.use("/v1/api/calendars", calendarRouter);
};
