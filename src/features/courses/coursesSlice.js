import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  levels: [],
  userCourses: [],
  currentUser: null,
  error: null,
  isLoading: false,
};

const userCoursesSlice = createSlice({
  name: 'userCourses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setLevels: (state, action) => {
      state.levels = action.payload;
    },
    setUserCourses: (state, action) => {
      state.userCourses = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCourses, setLevels, setUserCourses, setCurrentUser, setError, setLoading } = userCoursesSlice.actions;
export default userCoursesSlice.reducer;
