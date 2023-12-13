import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTask } from "@/types";
const initialState: TTask[] = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<TTask>) => {
      state.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TTask>) => {
      const updatedTask = action.payload;
      const index = state.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state[index] = updatedTask;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskIdToDelete = action.payload;
      const index = state.findIndex((task) => task.id === taskIdToDelete);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { createTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
