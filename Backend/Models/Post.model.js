import mongoose from "mongoose";
import moment from "moment-timezone";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
    default: "",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [],
  createdTime: {
    type: Number,
    default: Date.now(),
  },
  createdAt: {
    type: String,
    default: moment(Date.now())
      .tz("Asia/Kolkata")
      .format(" HH:mm:ss YYYY-MM-DD"),
  },
});

export const Post = mongoose.model("Post", postSchema);
