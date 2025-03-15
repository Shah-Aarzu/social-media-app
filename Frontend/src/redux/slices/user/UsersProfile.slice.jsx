import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorNotification } from "../../../utils/Notifications";

export const getUsersProfile = createAsyncThunk(
  "getUsersProfile",
  async (data) => {
    try {
      const res = await axios.post(
        "https://social-media-app-yog9.onrender.com/api/users/usersProfile",
        data
      );

      return res;
    } catch (error) {
      errorNotification(error.message);
    }
  }
);

export const UsersProfileSlice = createSlice({
  name: "usersProfile",

  initialState: {
    usersProfile: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsersProfile.pending, (state) => {
        if (state.usersProfile == null) state.status = "loading";
      })
      .addCase(getUsersProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersProfile = action.payload.data ? action.payload.data : null;
      })
      .addCase(getUsersProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UsersProfileSlice.reducer;
