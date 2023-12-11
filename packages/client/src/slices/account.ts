// accountSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IUser } from "@/types";

const initialState: IUser = {
  id: 0,
  username: "",
  isLogged: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      state.username = action.payload.username;
      state.isLogged = true;
    },
    refreshLogin: (state) => {
      state.isLogged = false;
    },
    logOut: (state) => {
      state.id = 0;
      state.username = "";
      state.isLogged = false;
    },
  },
});

export const { login, refreshLogin, logOut } = accountSlice.actions;
export default accountSlice.reducer;
