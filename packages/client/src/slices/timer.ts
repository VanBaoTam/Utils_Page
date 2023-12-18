import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTimers } from "@/types";
import { displayToastPernament } from "@/utils/toast";
import { DAYS } from "@/constants";
const initialState: TTimers[] = [];

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    createTimer: (state, action: PayloadAction<TTimers>) => {
      if (action.payload !== null) state.push(action.payload);
    },
    updateTimer: (state, action: PayloadAction<TTimers>) => {
      const updatedTimer = action.payload;
      const index = state.findIndex((timer) => timer.id === updatedTimer.id);
      if (index !== -1) {
        state[index] = updatedTimer;
        state[index].isNotified = false;
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
    checkNotifTimer: (state) => {
      const currentDay = new Date().getDay();
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      state.forEach((element) => {
        if (element.isNotified) return;
        const choosenDays = element.choosen_days.map((day) => day.trim());

        if (!choosenDays.includes(DAYS[currentDay])) return;

        const [hour, minute] = element.noting_time.split(":").map(Number);

        if (
          currentHour < hour ||
          (currentHour === hour && currentMinute < minute)
        ) {
          return;
        }

        displayToastPernament(
          `TIMER ${element.title} is at the noting time`,
          "warning"
        );
        element.isNotified = true;
      });
    },
  },
});

export const {
  createTimer,
  updateTimer,
  deleteTimer,
  loadTimersContents,
  checkNotifTimer,
} = timerSlice.actions;
export default timerSlice.reducer;
