// Redux Store
import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./src/features/dashboard/listSlice";

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export default store;
