import { ETasksStatus, TTask } from "@/types";

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
export { tasks };
