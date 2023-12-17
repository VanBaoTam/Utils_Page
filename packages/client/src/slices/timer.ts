import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTimers } from "@/types";
const initialState: TTimers[] = [];

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    createTimer: (state, action: PayloadAction<TTimers>) => {
      state.push(action.payload);
    },
    updateTimer: (state, action: PayloadAction<TTimers>) => {
      const updatedTimer = action.payload;
      const index = state.findIndex((timer) => timer.id === updatedTimer.id);
      if (index !== -1) {
        state[index] = updatedTimer;
      }
    },
    deleteTimer: (state, action: PayloadAction<number>) => {
      const timerIdToDelete = action.payload;
      const index = state.findIndex((timer) => timer.id === timerIdToDelete);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    loadTimersContents: (state, action: PayloadAction<TTimers[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { createTimer, updateTimer, deleteTimer, loadTimersContents } =
  timerSlice.actions;
export default timerSlice.reducer;
