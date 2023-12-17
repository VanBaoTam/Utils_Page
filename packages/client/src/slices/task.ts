import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTask } from "@/types";

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
  },
});

export const { createTask, updateTask, deleteTask, loadTaskContents } =
  taskSlice.actions;
export default taskSlice.reducer;
