import { ETasksStatus, TTask } from "@/types";

// TASKS
const tasks: TTask[] = [
  {
    id: 1,
    user_id: 1,
    name: "TEST ACTIVE",
    created_date: new Date("2023-11-29"),
    started_date: new Date("2023-11-30"),
    noting_date: new Date("2023-11-30"),
    finished_date: new Date("2023-11-30"),
    description: "TESTING",
    status: ETasksStatus.active,
  },
  {
    id: 2,
    user_id: 1,
    name: "TEST FINISH",
    created_date: new Date("2023-11-10"),
    started_date: new Date("2023-11-12"),
    noting_date: new Date("2023-11-12"),
    finished_date: new Date("2023-11-12"),
    description: "TESTING FINISH",
    status: ETasksStatus.finished,
  },
  {
    id: 3,
    user_id: 1,
    name: "TEST EXPIRED",
    created_date: new Date("2023-11-21"),
    started_date: new Date("2023-11-22"),
    noting_date: new Date("2023-11-23"),
    finished_date: new Date("2023-11-23"),
    description: "TESTING",
    status: ETasksStatus.expired,
  },
  {
    id: 4,
    user_id: 1,
    name: "TEST suspended",
    created_date: new Date("2023-11-29"),
    started_date: new Date("2023-11-30"),
    noting_date: new Date("2023-11-30"),
    finished_date: new Date("2023-11-30"),
    description: "TESTINGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    status: ETasksStatus.suspended,
  },
];
export { tasks };
