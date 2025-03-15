import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../utils/Notifications";

export const getAllPosts = createAsyncThunk("getAllPosts", async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/posts/getAllPosts",
      data
    );

    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const getAllPostsSlice = createSlice({
  name: "getAllPosts",

  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        if (state.posts.length == 0) state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        if (action.payload && action.payload.status == 200) {
          state.status = "succeeded";
          state.posts = action.payload.data.postsWithUser;
          localStorage.setItem("userId", action.payload.data.id);
        }
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getAllPostsSlice.reducer;
