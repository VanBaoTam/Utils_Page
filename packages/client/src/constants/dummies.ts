import {
  ETasksStatus,
  ETimerDays,
  ETimerStatus,
  ILogin,
  TCalendars,
  TNote,
  TTask,
  TTimers,
} from "@/types";

// ACCOUNT
const accountList: ILogin[] = [
  { username: "", password: "" },
  { username: "admin", password: "" },
];
// TASKS
const tasks: TTask[] = [
  {
    id: 1,
    user_id: 1,
    name: "TEST ACTIVE",
    created_date: new Date("2023-11-29T18:00:00"),
    started_date: new Date("2023-11-30T18:00:00"),
    noting_date: new Date("2023-11-30T19:00:00"),
    finished_date: new Date("2023-11-30T19:30:00"),
    description: "TESTING",
    status: ETasksStatus.active,
  },
  {
    id: 2,
    user_id: 1,
    name: "TEST FINISH",
    created_date: new Date("2023-11-10T18:00:00"),
    started_date: new Date("2023-11-12T18:00:00"),
    noting_date: new Date("2023-11-12T19:00:00"),
    finished_date: new Date("2023-11-12T19:20:00"),
    description: "TESTING FINISH",
    status: ETasksStatus.finished,
  },
  {
    id: 3,
    user_id: 1,
    name: "TEST EXPIRED",
    created_date: new Date("2023-11-21T18:00:00"),
    started_date: new Date("2023-11-22T18:00:00"),
    noting_date: new Date("2023-11-23T19:00:00"),
    finished_date: new Date("2023-11-23T19:10:00"),
    description: "TESTING",
    status: ETasksStatus.expired,
  },
  {
    id: 4,
    user_id: 1,
    name: "TEST suspended",
    created_date: new Date("2023-11-29T18:00:00"),
    started_date: new Date("2023-11-30T18:00:00"),
    noting_date: new Date("2023-11-30T20:00:00"),
    finished_date: new Date("2023-11-30T20:10:00"),
    description: "TESTINGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    status: ETasksStatus.suspended,
  },
];

//NOTE
const notes: TNote[] = [
  {
    id: 1,
    user_id: 1,
    name: "For Works",
    updated_date: new Date(),
    content: "TESTING",
    status: 1,
  },
  {
    id: 2,
    user_id: 1,
    name: "Thesis",
    updated_date: new Date(),
    content: "Thesis",
    status: 1,
  },
  {
    id: 3,
    user_id: 1,
    name: "Giáo trình ",
    updated_date: new Date(),
    content: "TESTING",
    status: 1,
  },
  {
    id: 4,
    user_id: 1,
    name: "Note báo cáo thứ 4",
    updated_date: new Date(),
    content: "TESTING 2",
    status: 1,
  },
  {
    id: 5,
    user_id: 1,
    name: "checklist",
    updated_date: new Date(),
    content: "TESTING",
    status: 1,
  },
  {
    id: 6,
    user_id: 1,
    name: "Planning",
    updated_date: new Date(),
    content: "TESTING 2",
    status: 1,
  },
  {
    id: 7,
    user_id: 1,
    name: "Mobile 13/12/2023",
    updated_date: new Date(),
    content: "TESTING",
    status: 1,
  },
  {
    id: 8,
    user_id: 1,
    name: "Debug task feature",
    updated_date: new Date(),
    content: "TESTING 2",
    status: 1,
  },
  {
    id: 9,
    user_id: 1,
    name: "estimate",
    updated_date: new Date(),
    content: "TESTING",
    status: 1,
  },
  {
    id: 10,
    user_id: 1,
    name: "Roadmap.sh",
    updated_date: new Date(),
    content: "TESTING 2",
    status: 1,
  },
];
//TIMER
const timers: TTimers[] = [
  {
    id: 1,
    user_id: 1,
    title: "Weekly Online Meeting",
    repeater: ETimerStatus.repeat_once,
    noting_time: "7:32",
    choosen_days: [ETimerDays.monday],
  },
  {
    id: 2,
    user_id: 1,
    title: "Thesis",
    repeater: ETimerStatus.repeat_many,
    noting_time: "19:00",
    choosen_days: [ETimerDays.monday, ETimerDays.wednesday, ETimerDays.friday],
  },
  {
    id: 3,
    user_id: 1,
    title: "Study",
    repeater: ETimerStatus.always,
    noting_time: "15:00",
    choosen_days: [ETimerDays.tuesday, ETimerDays.thursday],
  },
];

//CALENDARS
const calendars: TCalendars[] = [
  {
    id: 1,
    user_id: 1,
    choosen_date: "2023-12-21",
    noting_time: "8:00",
    notification: "Reminder for works",
  },
  {
    id: 2,
    user_id: 1,
    choosen_date: "2023-12-31",
    noting_time: "10:00",
    notification: "Cuoi nam",
  },
];

export { accountList, tasks, notes, timers, calendars };
