import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../Models/User.model.js";
import { Post } from "../Models/Post.model.js";
import moment from "moment-timezone";
import mongoose from "mongoose";
import Stripe from "stripe";
import { io, getReceiverSocketId } from "../index.js";

export const createUser = async (req, res) => {
  try {
    console.log("createUser");

    const { fullname, username, email, password, bio } = req.body;
    const filename = req.file ? req.file.filename : "";
    let imageUrl = "";

    const createdAt = moment(Date.now())
      .tz("Asia/Kolkata")
      .format("HH:mm:ss DD-MM-YYYY");

    let existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.json({ message: "User already exists", created: false });
    }

    if (filename != "") {
      imageUrl = await cloudinary.uploader.upload(req.file.path);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      profile: imageUrl != "" ? imageUrl.secure_url : "",
      fullname,
      username,
      email,
      password: hashedPassword,
      bio,
      createdAt,
    });
    await newUser.save();

    res.json({ message: "User Created Successfully", created: true, newUser });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const userDetail = async (req, res) => {
  try {
    console.log("userDetail");
    const { id } = req;

    const userData = await User.findOne(
      { _id: id },
      { profile: 1, fullname: 1, username: 1, email: 1, bio: 1 }
    );

    res.json({
      message: "User Data Fetched Successfully",
      userData,
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("updateProfile");
    const { fullname, username, email, bio } = req.body;
    const { id } = req;
    const filename = req.file ? req.file.filename : "";
    let imageUrl = "";

    if (filename != "") {
      imageUrl = await cloudinary.uploader.upload(req.file.path);
    }

    if (imageUrl)
      await User.updateOne(
        { _id: id },
        { fullname, bio, profile: imageUrl.secure_url }
      );
    else await User.updateOne({ _id: id }, { fullname, bio });

    return res.json({
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("loginUser");

    const { username, password } = req.body;
    let token = "";

    const user = await User.findOne({ username });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.json({ message: "Invalid credentials", auth: false, token });
    }

    token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Logged in", userId: user._id, auth: true, token });
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

export const userProfile = async (req, res) => {
  try {
    console.log("userProfile");

    let { id } = req;
    const { username, token } = req.body;

    if (username != null) {
      const user = await User.findOne({ username });
      id = user._id;
    }

    const userProfile = await User.findOne(
      { _id: id },
      { email: 0, password: 0, createdAt: 0 }
    );

    const userPosts = await Post.find({ author: id }).sort({ createdTime: -1 });

    res.json({
      message: "Profile Fetched Successfully",
      userProfile,
      userPosts,
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const usersProfile = async (req, res) => {
  try {
    console.log("usersProfile");
    const { username } = req.body;
    let followToggle = true;
    let followUnfollowToggle = true;

    const followUnfollow = await User.find({
      username,
      followers: { $eq: req.id },
    });

    if (followUnfollow.length > 0) followUnfollowToggle = false;

    const userProfile = await User.findOne(
      { username },
      { email: 0, password: 0, createdAt: 0 }
    );

    if (userProfile._id.equals(req.id)) followToggle = false;
    const usersPosts = await Post.find({ author: userProfile._id }).sort({
      createdTime: -1,
    });

    res.json({ userProfile, usersPosts, followToggle, followUnfollowToggle });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    console.log("getUsers");
    const { search } = req.body;
    let users;
    if (search === "allUsers") {
      users = await User.find(
        {},
        {
          fullname: 1,
          username: 1,
          profile: 1,
        }
      );
      return res.json({ message: "Users Fetched Successfully", users });
    }

    users = await User.find(
      {
        $or: [
          { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
          { username: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      },
      { fullname: 1, username: 1, profile: 1 }
    );
    if (users.length > 0)
      return res.json({ message: "User Fetched Successfully", users });
    res.json({ message: "User Not Found", users });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const followUnfollow = async (req, res) => {
  try {
    console.log("followUnfollow");

    const { username } = req.body;
    const { id } = req;
    let followingToggle = true;

    let result = await User.findOne({ username });

    const user = await User.find({ username, followers: { $eq: id } });
    if (user.length > 0) {
      await User.updateOne(
        { username, followers: { $eq: id } },
        { $pull: { followers: id } }
      );

      await User.updateOne(
        { _id: id, following: { $eq: result._id } },
        { $pull: { following: result._id } }
      );

      return res.json({ message: "Unfollowing", followingToggle });
    } else {
      await User.updateOne(
        { username, followers: { $ne: id } },
        { $push: { followers: id } }
      );

      await User.updateOne(
        { _id: id, following: { $ne: result._id } },
        { $push: { following: result._id } }
      );
      followingToggle = false;

      const users = await User.findOne(
        { _id: id },
        { profile: 1, username: 1, fullname: 1, _id: 0 }
      );

      const messagesId = await User.findOne({
        _id: id,
        messages: { $elemMatch: { id: result._id } },
      });
      // console.log(messagesId);
      if (messagesId === null) {
        await User.updateOne(
          { _id: id },
          {
            $push: {
              messages: {
                id: result._id,
                profile: result.profile,
                fullname: result.fullname,
                username: result.username,
                chats: [],
              },
            },
          }
        );
        await User.updateOne(
          { _id: result._id },
          {
            $push: {
              messages: {
                id: id,
                profile: users.profile,
                fullname: users.fullname,
                username: users.username,
                chats: [],
              },
            },
          }
        );
      }

      const createdAt = moment(Date.now())
        .tz("Asia/Kolkata")
        .format("HH:mm:ss DD-MM-YYYY");

      const _id = new mongoose.Types.ObjectId();
      const userObject = users.toObject();
      userObject["follow"] = true;
      userObject["createdAt"] = createdAt;
      userObject["createdTime"] = Date.now();
      userObject["_id"] = _id;

      const postUser = await User.findOne({ username }, { _id: 1 });

      await User.updateOne(
        { _id: postUser._id },
        { $push: { notifications: userObject } }
      );

      return res.json({ message: "Following", followingToggle });
    }
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getFollowers = async (req, res) => {
  try {
    console.log("getFollowers");

    const { userId } = req.body;
    const id = userId ? userId : req.id;

    const user = await User.findById(id).populate(
      "followers",
      "_id profile fullname username bluetick"
    );

    res.json({
      message: "Followers Fetch Successfully",
      followers: user.followers,
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getFollowing = async (req, res) => {
  try {
    console.log("getFollowing");
    const { userId } = req.body;
    const id = userId ? userId : req.id;

    const user = await User.findById(id).populate(
      "following",
      "_id profile fullname username bluetick"
    );

    res.json({
      message: "Following Fetch Successfully",
      following: user.following,
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getLikes = async (req, res) => {
  try {
    console.log("getLikes");
    const { postId } = req.body;

    const user = await Post.findById(postId).populate(
      "likes",
      "_id profile fullname username bluetick"
    );

    res.json({
      message: "Following Fetch Successfully",
      likes: user.likes,
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const removeUser = async (req, res) => {
  try {
    console.log("removeUser");
    const { userId } = req.body;

    await User.deleteOne({ _id: userId });
    await Post.deleteMany({ author: userId });

    res.json({
      message: "User Remove Successfully",
    });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    console.log("getMessages");
    const { id } = req;

    const messages = await User.findOne(
      { _id: id },
      { messages: 1, username: 1 }
    );

    res
      .status(200)
      .json({ message: "Messages Fetched Successfully", messages });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const setMessages = async (req, res) => {
  try {
    console.log("setMessages");
    const { id } = req;
    const { username, message, receiverId } = req.body;

    const myDetail = await User.findOne({ _id: id });
    const userDetail = await User.findOne({ username });

    const createdAt = moment(Date.now())
      .tz("Asia/Kolkata")
      .format("HH:mm:ss DD-MM-YYYY");

    await User.updateOne(
      {
        _id: id,
        messages: { $elemMatch: { username: username } },
      },
      {
        $push: {
          "messages.$.chats": {
            username,
            message,
            createdAt,
          },
        },
      }
    );
    await User.updateOne(
      {
        _id: userDetail._id,
        messages: { $elemMatch: { username: myDetail.username } },
      },
      {
        $push: {
          "messages.$.chats": {
            username,
            message,
            createdAt,
          },
        },
      }
    );

    const receiverNewMessage = { username, message, createdAt };
    const senderNewMessage = { username, message, createdAt };

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", receiverNewMessage);
    }

    const senderSocketId = getReceiverSocketId(id);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", senderNewMessage);
    }

    res.status(200).json({ message: "Messages Send Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const stripe = async (req, res) => {
  try {
    console.log("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Blue Tick Subscription",
            },
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://mellow-gumdrop-7e81ed.netlify.app/user/subscription?success=true`,
      cancel_url: `https://mellow-gumdrop-7e81ed.netlify.app/user/subscription?canceled=true`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const payment = async (req, res) => {
  try {
    console.log("payment");

    await User.findOneAndUpdate({ _id: req.id }, { $set: { bluetick: true } });

    res.json({ message: "Payment Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
