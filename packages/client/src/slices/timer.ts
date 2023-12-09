import { createSlice } from "@reduxjs/toolkit";
import { TTimers } from "@/types";
const initialState: TTimers[] = [];

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {},
});

export const {} = timerSlice.actions;
export default timerSlice.reducer;
