import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../utils/Notifications";

export const getAllnotifications = createAsyncThunk(
  "getAllnotifications",
  async (data) => {
    try {
      const res = await axios.post(
        "https://social-media-app-yog9.onrender.com/api/posts/notifications",
        data
      );

      return res;
    } catch (error) {
      errorNotification(error.message);
    }
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",

  initialState: {
    notifications: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllnotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllnotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.data.notifications;

        state.status = "succeeded";
      })
      .addCase(getAllnotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notificationsSlice.reducer;
