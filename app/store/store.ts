import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import loadingSlice from "../slices/loadingSlice";
import jobSlice from "../slices/jobSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice,
    allJobs: jobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
