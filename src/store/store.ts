import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo-slice.ts";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
