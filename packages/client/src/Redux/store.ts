import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "@slices/account";
import taskReducer from "@slices/task";
import noteReducer from "@slices/note";
import timerReducer from "@slices/timer";
import calendarReducer from "@slices/calendar";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    task: taskReducer,
    note: noteReducer,
    timer: timerReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
