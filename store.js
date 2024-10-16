import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/features/auth/slices/authSlice";
import listReducer from "./src/features/dashboard/listSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,

  },
});




export default store;
