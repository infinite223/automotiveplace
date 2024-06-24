"use client";

import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./features/notifications/notificationsSlice";
import searchBarSlice from "./features/searchBar/searchBarSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationSlice,
    searchBar: searchBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
