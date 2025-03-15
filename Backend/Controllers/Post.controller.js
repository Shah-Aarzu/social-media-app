import { v2 as cloudinary } from "cloudinary";
import { Post } from "../Models/Post.model.js";
import { User } from "../Models/User.model.js";
import moment from "moment-timezone";
import mongoose from "mongoose";
import { populate } from "dotenv";

export const createPost = async (req, res) => {
  try {
    console.log("createPost");
    const { content } = req.body;
    const { id } = req;
    const filename = req.file ? req.file.filename : "";
    let imageUrl = "";

    if (filename != "") {
      imageUrl = await cloudinary.uploader.upload(req.file.path);
    }

    const createdAt = moment(Date.now())
      .tz("Asia/Kolkata")
      .format(" HH:mm:ss DD-MM-YYYY");

    const newPost = new Post({
      author: id,
      image: imageUrl != "" ? imageUrl.secure_url : "",
      caption: content,
      createdAt,
      createdTime: Date.now(),
    });
    await newPost.save();

    await User.updateOne({ _id: id }, { $push: { posts: newPost._id } });

    res.json({ message: "Post Created Successfully" });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req;
    const docs = await Post.find({ author: id });
    console.log("getPost");

    res.json({ message: "Post Fetched Successfully", docs });
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    console.log("getAllPosts");

    const { id } = req;
    const { token } = req.body;
    let allPosts = [];
    if (id) {
      let followings = await User.findOne(
        { _id: id },
        { following: 1, _id: 0 }
      );

      followings = followings ? followings.following : [];
      followings = [id, ...followings];

      allPosts = await Post.find({
        author: { $in: [id, ...followings] },
      })
        .populate(
          "author",
          "bio bluetick createdAt email followers following fullname messages notifications posts profile username _id"
        )
        .sort({ createdTime: -1 });
    } else {
      allPosts = await Post.find()
        .populate(
          "author",
          "bio bluetick createdAt email followers following fullname messages notifications posts profile username _id"
        )
        .sort({ createdTime: -1 });
    }

    res.status(200).json({
      message: "Posts Fetched Successfully",
      token,
      id,
      postsWithUser: allPosts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const like = async (req, res) => {
  try {
    console.log("like");

    const { postId } = req.body;
    const { id } = req;

    const post = await Post.find({ _id: postId, likes: { $eq: id } });

    if (post.length > 0) {
      await Post.updateOne(
        { _id: postId, likes: { $eq: id } },
        { $pull: { likes: id } }
      );
      return res.json({ message: "Disliked" });
    } else {
      await Post.updateOne(
        { _id: postId, likes: { $ne: id } },
        { $push: { likes: id } }
      );

      const user = await User.findOne(
        { _id: id },
        { profile: 1, username: 1, _id: 0 }
      );

      const createdAt = moment(Date.now())
        .tz("Asia/Kolkata")
        .format("HH:mm:ss DD-MM-YYYY");

      const _id = new mongoose.Types.ObjectId();
      const userObject = user.toObject();
      userObject["like"] = true;
      userObject["createdAt"] = createdAt;
      userObject["createdTime"] = Date.now();
      userObject["_id"] = _id;

      const postUser = await Post.findOne(
        { _id: postId },
        { image: 1, author: 1, _id: 0 }
      );

      userObject["image"] = postUser.image;

      await User.updateOne(
        { _id: postUser.author },
        { $push: { notifications: userObject } }
      );

      return res.json({ message: "Liked" });
    }
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const comments = async (req, res) => {
  try {
    console.log("comments");
    const { comment, postId } = req.body;
    const { id } = req;

    if (comment === undefined) {
      const comments = await Post.findOne({ _id: postId }, { comments: 1 });

      return res.json({ message: "Comments Fetched Successfully", comments });
    } else {
      {
        const user = await User.findOne(
          { _id: id },
          { profile: 1, username: 1, _id: 0 }
        );

        const createdAt = moment(Date.now())
          .tz("Asia/Kolkata")
          .format("HH:mm:ss DD-MM-YYYY");

        const _id = new mongoose.Types.ObjectId();
        const userObject = user.toObject();
        userObject["comment"] = true;
        userObject["createdAt"] = createdAt;
        userObject["createdTime"] = Date.now();
        userObject["_id"] = _id;

        const postUser = await Post.findOne(
          { _id: postId },
          { image: 1, author: 1, _id: 0 }
        );

        userObject["image"] = postUser.image;
        await User.updateOne(
          { _id: postUser.author },
          { $push: { notifications: userObject } }
        );
      }
      const user = await User.findOne(
        { _id: id },
        { profile: 1, username: 1, fullname: 1 }
      );

      const createdAt = moment(Date.now())
        .tz("Asia/Kolkata")
        .format("HH:mm:ss DD-MM-YYYY");

      const commentId = new mongoose.Types.ObjectId();
      const userObject = user.toObject();
      userObject["comment"] = comment;
      userObject["createdAt"] = createdAt;
      userObject["commentId"] = commentId;

      await Post.updateOne(
        { _id: postId },
        { $push: { comments: userObject } }
      );
      const comments = await Post.findOne({ _id: postId }, { comments: 1 });

      return res.json({ message: "Comment Successfully", comments });
    }
  } catch (err) {
    res.json({ message: "Server error" });
  }
};

export const notifications = async (req, res) => {
  try {
    const { id } = req;
    console.log("notifications");

    const notifications = await User.aggregate([
      { $match: { _id: id } },
      {
        $project: {
          notifications: {
            $sortArray: {
              input: "$notifications",
              sortBy: { createdTime: -1 },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      message: "Notifications Fetched Successfully",
      notifications: notifications[0]?.notifications,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removePost = async (req, res) => {
  try {
    console.log("removePost");
    const { postId, author } = req.body;

    await Post.deleteOne({ _id: postId });

    await User.updateOne({ _id: author }, { $pull: { posts: postId } });

    res.status(200).json({ message: "Post Removed Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
