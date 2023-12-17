import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCalendars } from "@/types";
import dayjs from "dayjs";
import { displayToastPernament } from "@/utils/toast";
const initialState: TCalendars[] = [];

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    createCalendar: (state, action: PayloadAction<TCalendars>) => {
      if (action.payload !== null) state.push(action.payload);
    },
    updateCalendar: (state, action: PayloadAction<TCalendars>) => {
      const updatedCalendar = action.payload;
      const index = state.findIndex(
        (calendar) => calendar.id === updatedCalendar.id
      );
      if (index !== -1) {
        state[index] = updatedCalendar;
      }
    },
    deleteCalendar: (state, action: PayloadAction<number>) => {
      const calendarIdToDelete = action.payload;
      const index = state.findIndex(
        (calendar) => calendar.id === calendarIdToDelete
      );

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    loadCalendarsContents: (state, action: PayloadAction<TCalendars[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
    checkNotifCalendar: (state) => {
      const currentDate = new Date();
      const currentPlus5Minutes = dayjs(currentDate).add(5, "minutes").toDate();
      state.forEach((element) => {
        const [day, month, year] = element.choosen_date
          .split("/")
          .map((part) => parseInt(part.trim(), 10));
        const eleDate = dayjs(
          `${year}/${month}/${day}T${element.noting_time}`
        ).toDate();
        if (
          dayjs(eleDate).isAfter(currentDate) &&
          dayjs(eleDate).isBefore(currentPlus5Minutes)
        ) {
          displayToastPernament(
            `NOTE FOR DAYS ${element.name} is at the noting time`,
            "warning"
          );
        }
      });
    },
  },
});

export const {
  createCalendar,
  updateCalendar,
  deleteCalendar,
  loadCalendarsContents,
  checkNotifCalendar,
} = calendarSlice.actions;
export default calendarSlice.reducer;
