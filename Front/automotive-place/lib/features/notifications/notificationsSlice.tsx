import { INotification } from "@/app/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: INotification[] = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const lastIdNotification = state.findLast((_n) => _n.id);
      console.log(lastIdNotification);

      const newNotification = {
        ...JSON.parse(action.payload),
        id: lastIdNotification ? lastIdNotification : 1,
      };
      return [...state, newNotification];
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
