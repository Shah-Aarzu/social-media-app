import mongoose from "mongoose";
import moment from "moment-timezone";

const userSchema = new mongoose.Schema({
  profile: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bluetick: {
    type: Boolean,
    default: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bio: {
    type: String,
    default: "",
  },
  messages: [],
  notifications: [],
  createdAt: {
    type: String,
    default: moment(Date.now())
      .tz("Asia/Kolkata")
      .format("HH:mm:ss DD-MM-YYYY"),
  },
});

export const User = mongoose.model("User", userSchema);
