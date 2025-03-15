import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../utils/Notifications";

export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts/comments",
        data
      );

      return res;
    } catch (error) {
      errorNotification(error.message);
    }
  }
);

export const getAllCommentsSlice = createSlice({
  name: "getAllComments",

  initialState: {
    comments: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        if (state.comments == null) state.status = "loading";
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        if (action.payload.status == 200 && action.payload.data.comments) {
          state.status = "succeeded";
          state.comments = action.payload.data.comments;
        }
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getAllCommentsSlice.reducer;
