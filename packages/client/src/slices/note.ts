import { createSlice } from "@reduxjs/toolkit";
import { TNote } from "@/types";
const initialState: TNote[] = [];

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
});

export const {} = noteSlice.actions;
export default noteSlice.reducer;
