import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../../../utils/Notifications";

export const getFollowers = createAsyncThunk("getFollowers", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/getFollowers",
      data
    );

    return res.data;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const getFollowing = createAsyncThunk("getFollowing", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/getFollowing",
      data
    );

    return res.data;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const getLikes = createAsyncThunk("getLikes", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/getLikes",
      data
    );

    return res.data;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const userUtilitySlice = createSlice({
  name: "userUtility",

  initialState: {
    userUtilityData: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFollowers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userUtilityData = action.payload.followers;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getFollowing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userUtilityData = action.payload.following;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getLikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userUtilityData = action.payload.likes;
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userUtilitySlice.reducer;
