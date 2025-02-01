import { getMainContentDataForUser } from "@/app/services/content";
import { TContentData } from "@/app/utils/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ContentState {
  contentData: TContentData[];
  page: number;
  isLoading: boolean;
}

const initialState: ContentState = {
  contentData: [],
  page: 1,
  isLoading: false,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (page: number) => {
    const content = await getMainContentDataForUser(page);
    return content.data;
  }
);

const contentDataSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setContentData(state, action: PayloadAction<TContentData[]>) {
      state.contentData = action.payload;
    },
    addContentData(state, action: PayloadAction<TContentData[]>) {
      state.contentData = [...state.contentData, ...action.payload];
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearContentData(state) {
      state.contentData = [];
      state.page = 1;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<TContentData[]>) => {
          state.isLoading = false;
          state.contentData = [...state.contentData, ...action.payload];
        }
      )
      .addCase(fetchProjects.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setContentData, addContentData, setPage, clearContentData } =
  contentDataSlice.actions;
export default contentDataSlice.reducer;
