import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./Pages/Index.jsx";
import AppAdmin from "./AppAdmin.jsx";
import AppUser from "./AppUser.jsx";
import AdminLogin from "./adminDashboard/AdminLogin.jsx";
import Posts from "./adminDashboard/Posts.jsx";
import Users from "./adminDashboard/Users.jsx";
import Home from "./Pages/Home.jsx";
import Search from "./Pages/Search.jsx";
import Explore from "./Pages/Explore.jsx";
import Notifications from "./Pages/Notifications.jsx";
import Create from "./Pages/Create.jsx";
import Profile from "./Pages/Profile.jsx";
import Messages from "./Pages/Messages.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import { useSelector } from "react-redux";
import Comments from "./Pages/Comments.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import UserPosts from "./Pages/UserPosts.jsx";
import UpdateProfile from "./Pages/UpdateProfile.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import Subscription from "./Pages/Subscription.jsx";

const App = () => {
  const userAuth = useSelector((state) => state.userAuth.userAuth);
  const adminAuth = useSelector((state) => state.adminAuth.adminAuth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<Login />} />
        <Route path="/usersignup" element={<Signup />} />
        <Route path="/password-reset" element={<ForgetPassword />} />
        <Route path="/newpassword" element={<ResetPassword />} />
        <Route
          path="/admin/*"
          element={
            adminAuth === true ? <AppAdmin /> : <Navigate to="/adminlogin" />
          }
        >
          <Route index element={<Navigate to={"posts"} />} />
          <Route index path="posts" element={<Posts />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route
          path="/user/"
          element={
            userAuth === true ? <AppUser /> : <Navigate to="/userlogin" />
          }
        >
          <Route index element={<Navigate to={"home"} />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="explore" element={<Explore />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="comment/:postId" element={<Comments />} />
          <Route path="posts/:username" element={<UserPosts />} />
          <Route path=":username" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
