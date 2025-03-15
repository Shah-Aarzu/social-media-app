import express from "express";
import { upload } from "../Middlewares/index.js";
import { authMiddleware } from "../Middlewares/index.js";
import {
  createPost,
  getPost,
  getAllPosts,
  like,
  comments,
  notifications,
  removePost,
} from "../Controllers/Post.controller.js";

const route = express.Router();

route.post("/createPost", upload.single("image"), authMiddleware, createPost);
route.post("/getPost", authMiddleware, getPost);
route.post("/getAllPosts", authMiddleware, getAllPosts);
route.post("/like", authMiddleware, like);
route.post("/comments", authMiddleware, comments);
route.post("/notifications", authMiddleware, notifications);
route.post("/removePost", authMiddleware, removePost);

export default route;
