import { createSlice } from "@reduxjs/toolkit";

const listintialState = {
  search: "",
  sortConfig: null,
  filter: null,
};

const listSlice = createSlice({
  name: "list",
  initialState: listintialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearchTerm, setSortConfig, setFilter } = listSlice.actions;
export default listSlice.reducer;
