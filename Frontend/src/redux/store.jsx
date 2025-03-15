import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/admin/AdminAuth.slice";
import userReducer from "./slices/user/User.slice";
import userAuthReducer from "./slices/user/UserAuth.slice";
import userProfileReducer from "./slices/user/UserProfile.slice";
import postReducer from "./slices/post/Post.slice";
import getAllPostsReducer from "./slices/post/GetAllPosts.slice";
import UsersReducer from "./slices/user/GetUsers.slice";
import UsersProfileReducer from "./slices/user/UsersProfile.slice";
import FollowUnfollowReducer from "./slices/user/FollowUnfollow.slice";
import getAllCommentsReducer from "./slices/post/Comments.slice";
import notificationsReducer from "./slices/post/Notifications.slice";
import UserRemoveSlice from "./slices/user/UserRemove.slice";
import MessagesReducer from "./slices/user/Messages.slice";
import ResetPasswordReducer from "./slices/user/ResetPassword.slice";
import PaymentReducer from "./slices/user/Payment.slice";
import socketReducer from "./slices/user/SocketSlice";
import userUtilityReducer from "./slices/user/UserUtility.slice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    user: userReducer,
    userAuth: userAuthReducer,
    userProfile: userProfileReducer,
    post: postReducer,
    getAllPosts: getAllPostsReducer,
    users: UsersReducer,
    usersProfile: UsersProfileReducer,
    followUnfollow: FollowUnfollowReducer,
    getAllComments: getAllCommentsReducer,
    notifications: notificationsReducer,
    userRemove: UserRemoveSlice,
    messages: MessagesReducer,
    resetPassword: ResetPasswordReducer,
    payment: PaymentReducer,
    socket: socketReducer,
    userUtility: userUtilityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
