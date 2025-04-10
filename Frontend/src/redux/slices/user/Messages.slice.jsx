import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorNotification } from "../../../utils/Notifications";

export const getMessages = createAsyncThunk("getMessages", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/getMessages",
      data
    );

    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const setMessages = createAsyncThunk("setMessages", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/setMessages",
      data
    );

    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const deleteMessage = createAsyncThunk("deleteMessage", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/deleteMessage",
      data
    );

    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const MessagesSlice = createSlice({
  name: "Messages",

  initialState: {
    messages: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        if (state.messages == null) state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload.data;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default MessagesSlice.reducer;
