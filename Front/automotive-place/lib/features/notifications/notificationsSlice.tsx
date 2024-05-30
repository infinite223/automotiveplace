import { INotification } from "@/app/components/logger/Notification";
import { createSlice } from "@reduxjs/toolkit";

const initialState: INotification[] = [
  {
    id: 1,
    log: {
      date: new Date(),
      status: "Success",
      title: "Udało się dodać element",
      message: "Element został pomyślnie dodany do Twojego garażu",
    },
    timer: 2000,
  },
];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return [...state, action.payload];
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      return state.filter((notification) => notification.id !== notificationId);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
