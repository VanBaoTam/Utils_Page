import { getTaskStatusColor } from "@/utils/color";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export enum EUserStatus {
  active = "activated",
  deactivated = "deactivated",
}
export enum ETasksStatus {
  active = "activated",
  suspended = "suspended",
  finished = "finished",
  expired = "expired",
}
export enum ETimerStatus {
  repeat_once = "once",
  repeat_many = "5m 3t",
  always = "always",
}
export enum ETimerDays {
  monday = "Monday",
  tuesday = "Tuesday",
  wednesday = "Wednesday",
  thursday = "Thursday",
  friday = "Friday",
  saturday = "Saturday",
  sunday = "Sunday",
}

export enum EToast {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
  default = "default",
}
export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  isLogged: boolean;
}
export interface IRequestOptions {
  baseUrl?: string;
  path: string;
  method?: "get" | "post" | "put" | "patch" | "delete" | "options";
  params?: Record<string | symbol | number, any>;
  body?: any;
  headers?: Record<string | symbol | number, any>;
}
export interface ISignUp extends IUser {
  username: string;
  password: string;
  name: string;
  email: string;
}
export type TTask = {
  id: number;
  user_id: number;
  name: string;
  created_date: Date;
  started_date: Date;
  noting_date: Date;
  finished_date: Date;
  status: ETasksStatus;
  description: string;
  isNotified?: boolean | undefined;
};
export type TNote = {
  id: number;
  user_id: number;
  name: string;
  content: string;
  updated_date: Date;
  status: number;
};
export type TCalendars = {
  id: number;
  user_id: number;
  name: string;
  choosen_date: string;
  noting_time: string;
  notification: string;
  isNotified?: boolean;
};

export type TTimers = {
  id: number;
  user_id: number;
  choosen_days: string[];
  noting_time: string;
  repeater: ETimerStatus;
  title: string;
  isNotified?: boolean | number;
};
export type UpdatingFormProps = {
  selectedId: number;
  data: any[];
  handleRefreshUpdating: () => void;
};
//COLS
export const taskCols: GridColDef[] = [
  {
    field: "name",
    headerName: "Task name",
    width: 200,
  },
  {
    field: "started_date",
    headerName: "Started Date",
    type: "date",
    valueFormatter: ({ value }: { value: string }) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "",
    width: 170,
  },
  {
    field: "noting_date",
    headerName: "Noting Date",
    type: "date",
    valueFormatter: ({ value }: { value: string }) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "",
    width: 170,
  },
  {
    field: "finished_date",
    headerName: "Finished Date",
    type: "date",
    valueFormatter: ({ value }: { value: string }) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "",
    width: 170,
  },

  {
    field: "description",
    headerName: "Description",
    width: 430,
  },
  {
    field: "status",
    headerName: "Status",
    width: 220,
    renderCell: (params) => {
      const backgroundColor = getTaskStatusColor(params.value as string);
      return (
        <div
          style={{
            backgroundColor,
            width: "100%",
            height: "100%",
            padding: "1rem",
          }}
        >
          {params.value ? params.value : "-"}
        </div>
      );
    },
  },
];

//THEME

// export interface template {
//   id: number;
// }
// export type tempalte = {
//   id: number;
// };
