"use client";

import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./features/notifications/notificationsSlice";
import searchBarSlice from "./features/searchBar/searchBarSlice";
import globalLoadingSlice from "./features/loading/globalLoadingSlice";
import stepDataSlice from "./features/stepData/stepDataSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationSlice,
    searchBar: searchBarSlice,
    globalLoading: globalLoadingSlice,
    stepData: stepDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
