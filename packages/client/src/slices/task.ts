import { createSlice } from "@reduxjs/toolkit";
import { TTask } from "@/types";
const initialState: TTask[] = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
