export enum EUserStatus {
  active = "activated",
  deactivated = "deactivated",
}
export enum ETasksStatus {
  active = "activated",
  suspensed = "suspended",
  finished = "finished",
  expired = "expired",
}
export enum ETimerStatus {
  repeat_once = "once",
  repeat_many = "5m 3t",
  always = "always",
}
export interface Iuser {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  status: EUserStatus;
}
export type TTask = {
  id: number;
  user_id: number;
  created_date: Date;
  started_date: Date;
  noting_date: Date;
  finished_date: Date;
  status: ETasksStatus;
  description: string;
};
export type TNote = {
  id: number;
  user_id: number;
  name: Date;
  content: string;
  updated_date: Date;
  status: number;
};
export type TCalendars = {
  id: number;
  user_id: number;
  choosen_date: Date;
  noting_time: Date;
  notification: string;
};
export type TTimers = {
  id: number;
  user_id: number;
  choosen_days: string[];
  noting_time: Date;
  repeater: ETimerStatus;
  title: string;
};

// export interface template {
//   id: number;
// }
// export type tempalte = {
//   id: number;
// };
