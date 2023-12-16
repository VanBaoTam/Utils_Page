import { JwtPayload } from "jsonwebtoken";

export interface authPayload extends JwtPayload {
  id: number;
  name: string;
}
export enum ETasksStatus {
  active = "activated",
  suspended = "suspended",
  finished = "finished",
  expired = "expired",
}

export enum EDataPaths {
  tasks = "tasks",
  notes = "notes",
  timers = "timers",
  calendars = "calendars",
}
