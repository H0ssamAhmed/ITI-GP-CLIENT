import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  role: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    authFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    clearUserRole: (state) => {
      state.role = null;
    },
  },
});

export const { startLoading, authSuccess, authFailure, logout,setUserRole, clearUserRole } = authSlice.actions;
export default authSlice.reducer;
