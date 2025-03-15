import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../../../utils/Notifications";

export const followUnfollow = createAsyncThunk(
  "followUnfollow",
  async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/followUnfollow",
        data
      );

      return res;
    } catch (error) {
      errorNotification(error.message);
    }
  }
);

export const FollowUnfollowSlice = createSlice({
  name: "FollowUnfollow",

  initialState: {
    followUnfollow: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(followUnfollow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUnfollow.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(followUnfollow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default FollowUnfollowSlice.reducer;
