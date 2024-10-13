import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/features/auth/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./src/features/dashboard/listSlice";

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export default store;
