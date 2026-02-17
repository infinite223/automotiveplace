import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loadingText: null,
};

export const globalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadingText: (state, action) => {
      state.loadingText = action.payload;
    },
  },
});

export const { setIsLoading, setLoadingText } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
