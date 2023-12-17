import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ETasksStatus, TTask } from "@/types";
import dayjs from "dayjs";
import { displayToast, displayToastPernament } from "@/utils/toast";

interface TaskState {
  ids: number;
  list: TTask[];
}

const initialState: TaskState = {
  ids: 0,
  list: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<TTask>) => {
      if (action.payload !== null) {
        state.ids++;
        state.list.push(action.payload);
      }
    },
    updateTask: (state, action: PayloadAction<TTask>) => {
      const updatedTask = action.payload;
      const index = state.list.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.list[index] = updatedTask;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskIdToDelete = action.payload;
      const index = state.list.findIndex((task) => task.id === taskIdToDelete);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    loadTaskContents: (state, action: PayloadAction<TTask[]>) => {
      state.list = action.payload;
    },
    checkStatus: (state) => {
      state.list.forEach((element) => {
        if (element.status === ETasksStatus.finished) return;
        if (dayjs(element.finished_date).toDate() < new Date()) {
          element.status = ETasksStatus.expired;
          return;
        }
      });
    },
    checkNotifTime: (state) => {
      state.list.forEach((element) => {
        if (element.status === ETasksStatus.finished) return;
        if (dayjs(element.noting_date).toDate() <= new Date()) {
          displayToastPernament(
            `Task ${element.name} is at the noting time`,
            "warning"
          );
          return;
        }
      });
    },
  },
});

export const {
  createTask,
  updateTask,
  deleteTask,
  loadTaskContents,
  checkStatus,
  checkNotifTime,
} = taskSlice.actions;
export default taskSlice.reducer;
