import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchBarOpen: true,
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setIsSearchBarOpen: (state, action) => {
      state.isSearchBarOpen = action.payload;
    },
  },
});

export const { setIsSearchBarOpen } = searchBarSlice.actions;

export default searchBarSlice.reducer;
