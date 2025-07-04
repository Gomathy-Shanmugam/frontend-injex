// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import gradeReducer from "./GradeSlice";

const store = configureStore({
  reducer: {
    grade: gradeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
