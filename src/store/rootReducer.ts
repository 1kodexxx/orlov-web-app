import { combineReducers } from "@reduxjs/toolkit";
import navbar from "./slices/navbarSlice";

const rootReducer = combineReducers({
  navbar,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
