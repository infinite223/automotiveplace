import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCreateProject: false,
  showCreateProblem: false,
  showCreatePost: false,
};

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setShowCreateProject: (state, action) => {
      state.showCreateProject = action.payload;
    },
    setShowCreateProblem: (state, action) => {
      state.showCreateProblem = action.payload;
    },
    setShowCreatePost: (state, action) => {
      state.showCreatePost = action.payload;
    },
  },
});

export const { setShowCreateProject, setShowCreatePost } = actionsSlice.actions;

export default actionsSlice.reducer;
