import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../../../utils/Notifications";

export const removeUser = createAsyncThunk("removeUser", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/removeUser",
      data
    );
    successNotification(res.data.message);
    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const UserRemoveSlice = createSlice({
  name: "userRemove",

  initialState: {
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(removeUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UserRemoveSlice.reducer;
