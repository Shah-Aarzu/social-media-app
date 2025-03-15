import express from "express";
import { upload } from "../Middlewares/index.js";
import { authMiddleware } from "../Middlewares/index.js";
import {
  createUser,
  loginUser,
  userProfile,
  usersProfile,
  getUsers,
  followUnfollow,
  removeUser,
  userDetail,
  updateProfile,
  getMessages,
  setMessages,
  payment,
  stripe,
  getFollowers,
  getFollowing,
  getLikes,
} from "../Controllers/User.controller.js";
import {
  otpGenerator,
  resetPassword,
  verifyOTP,
} from "../Controllers/PasswordReset.Controller.js";

const route = express.Router();

route.post("/createUser", upload.single("profile"), createUser);
route.post("/loginUser", loginUser);
route.post("/otpGenerator", otpGenerator);
route.post("/verifyOTP", verifyOTP);
route.post("/resetPassword", resetPassword);
route.post("/getUsers", authMiddleware, getUsers);
route.post("/userProfile", authMiddleware, userProfile);
route.post("/usersProfile", authMiddleware, usersProfile);
route.post("/followUnfollow", authMiddleware, followUnfollow);
route.post("/removeUser", authMiddleware, removeUser);
route.post("/userDetail", authMiddleware, userDetail);
route.post("/getMessages", authMiddleware, getMessages);
route.post("/setMessages", authMiddleware, setMessages);
route.post("/stripe", authMiddleware, stripe);
route.post("/payment", authMiddleware, payment);
route.post("/getFollowers", authMiddleware, getFollowers);
route.post("/getFollowing", authMiddleware, getFollowing);
route.post("/getLikes", authMiddleware, getLikes);
route.post(
  "/updateProfile",
  upload.single("profile"),
  authMiddleware,
  updateProfile
);

export default route;
