import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/features/auth/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
