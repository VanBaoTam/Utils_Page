import { createSlice } from "@reduxjs/toolkit";
import { TCalendars } from "@/types";
const initialState: TCalendars[] = [];

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
});

export const {} = calendarSlice.actions;
export default calendarSlice.reducer;
