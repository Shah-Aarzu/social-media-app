import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorNotification } from "../../../utils/Notifications";

export const payment = createAsyncThunk("payment", async (data) => {
  try {
    const res = await axios.post(
      "https://social-media-app-yog9.onrender.com/api/users/payment",
      data
    );
    return res;
  } catch (error) {
    errorNotification(error.message);
  }
});

export const stripeSessionId = createAsyncThunk(
  "stripeSessionId",
  async (data) => {
    try {
      const res = await axios.post(
        "https://social-media-app-yog9.onrender.com/api/users/stripe",
        data
      );
      return res;
    } catch (error) {
      errorNotification(error.message);
    }
  }
);

export const PaymentSlice = createSlice({
  name: "Payment",

  initialState: {
    data: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(payment.pending, (state) => {
        if (state.data == null) state.status = "loading";
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data ? action.payload.data : null;
      })
      .addCase(payment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default PaymentSlice.reducer;
