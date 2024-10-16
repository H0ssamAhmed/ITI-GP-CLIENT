import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/features/auth/slices/authSlice";
import listReducer from "./src/features/dashboard/listSlice";
import coursesSlice from "./src/features/courses/coursesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    coursesSlice: coursesSlice,
  },
});




export default store;
