import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILogin, IUser } from "@/types";
import { accountList } from "@/constants";
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
      const account = accountList.find(
        (item) =>
          item.username === action.payload.username &&
          item.password === action.payload.password
      );
      if (account) {
        state.username = account.username;
        state.isLogged = true;
      } else {
        state.isLogged = false;
      }
    },
    refreshLogin: (state) => {
      state.isLogged = false;
    },
    signOut: (_state) => {
      _state = initialState;
    },
  },
});

export const { login, refreshLogin } = accountSlice.actions;
export default accountSlice.reducer;
