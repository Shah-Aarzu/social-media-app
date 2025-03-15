import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../utils/Notifications";

export const postData = createAsyncThunk("postData", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/posts/createPost",
      data
    );
    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const getData = createAsyncThunk("getData", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/posts/getPost",
      data
    );
    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const like = createAsyncThunk("like", async (data) => {
  try {
    const res = await axios.post("https://social-media-app-yog9.onrender.com/api/posts/like", data);

    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const removePost = createAsyncThunk("removePost", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/posts/removePost",
      data
    );

    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const postSlice = createSlice({
  name: "post",

  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.data.docs;
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
