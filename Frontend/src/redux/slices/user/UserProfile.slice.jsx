import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../../../utils/Notifications";

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (data) => {
    try {
      const res = await axios.post(
        "https://social-media-app-yog9.onrender.com/api/users/userProfile",
        data
      );

      return res;
    } catch (error) {
      errorNotification(error.message);
    }
  }
);

export const UserProfileSlice = createSlice({
  name: "user",

  initialState: {
    userProfile: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        if (state.userProfile == null) state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userProfile = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UserProfileSlice.reducer;
