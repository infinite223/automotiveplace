"use client";

import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./features/notifications/notificationsSlice";
import searchBarSlice from "./features/searchBar/searchBarSlice";
import globalLoadingSlice from "./features/loading/globalLoadingSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationSlice,
    searchBar: searchBarSlice,
    globalLoading: globalLoadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
