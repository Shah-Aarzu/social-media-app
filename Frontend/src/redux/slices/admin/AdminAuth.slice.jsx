import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorNotification } from "../../../utils/Notifications";

export const adminAuth = createAsyncThunk("adminAuth", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/admin/adminLogin",
      data
    );
    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const adminAuthSlice = createSlice({
  name: "adminAuth",

  initialState: {
    adminAuth: localStorage.getItem("adminToken") ? true : false,
    loading: false,
    error: null,
  },

  reducers: {
    adminLogout: (state) => {
      localStorage.removeItem("adminToken");
      state.adminAuth = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.token.length > 0) {
          state.adminAuth = true;
          localStorage.setItem("adminToken", action.payload.data.token);
        }
      })
      .addCase(adminAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
