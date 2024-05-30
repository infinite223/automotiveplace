"use client";

import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./features/notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
