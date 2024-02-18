import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ETimerStatus, TTimers } from "@/types";
import { displayToast, displayToastPernament } from "@/utils/toast";
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
        if (element.isNotified === true) return;

        const choosenDays = element.choosen_days.map((day) => day.trim());

        if (!choosenDays.includes(DAYS[currentDay])) {
          element.isNotified = true;
          return;
        }

        const [hour, minute] = element.noting_time.split(":").map(Number);

        const timeDifference =
          (currentHour - hour) * 60 + (currentMinute - minute);

        if (timeDifference >= -5 && timeDifference <= 5) {
          if (element.repeater === ETimerStatus.repeat_once) {
            displayToast(
              `TIMER ${element.title} is at the noting time or is over`,
              "warning"
            );
            element.isNotified = true;
          } else if (element.repeater === ETimerStatus.repeat_many) {
            if (element.isNotified === undefined) {
              element.isNotified = 1;
            } else if (typeof element.isNotified === "number") {
              if (element.isNotified < 3) {
                element.isNotified++;
              } else {
                element.isNotified = true;
              }
            } else {
              element.isNotified = 1;
            }
          } else if (element.repeater === ETimerStatus.always) {
            displayToastPernament(
              `TIMER ${element.title} is at the noting time or is over`,
              "warning"
            );
            element.isNotified = true;
          }
        }
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
