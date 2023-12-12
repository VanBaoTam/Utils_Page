import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCalendars } from "@/types";
const initialState: TCalendars[] = [];

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    createCalendar: (state, action: PayloadAction<TCalendars>) => {
      state.push(action.payload);
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
  },
});

export const { createCalendar, updateCalendar, deleteCalendar } =
  calendarSlice.actions;
export default calendarSlice.reducer;
