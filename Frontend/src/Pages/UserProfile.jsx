import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersProfile } from "../redux/slices/user/UsersProfile.slice";
import { followUnfollow } from "../redux/slices/user/FollowUnfollow.slice";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emptyProfile from "../utils/Image/empty-profile.avif";
import bluetick from "../utils/Image/verify.png";
import FollowerPopUpBox from "../Components/FollowerPopUpBox";
import FollowingPopUpBox from "../Components/FollowingPopUpBox";
import {
  getFollowers,
  getFollowing,
} from "../redux/slices/user/UserUtility.slice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const [followerpopToggle, setFollowerPopToggle] = useState(false);
  const [followingpopToggle, setFollowingPopToggle] = useState(false);

  useEffect(() => {
    dispatch(
      getUsersProfile({ username, token: localStorage.getItem("userToken") })
    );
  }, []);

  const usersProfile = useSelector((state) => state.usersProfile);

  return (
    <>
      <ToastContainer transition={Slide} />
      {usersProfile.status == "loading" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Loading...
        </div>
      )}
      {usersProfile.status == "failed" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Check Your Internet Connection !!!
        </div>
      )}
      {usersProfile.status == "succeeded" && (
        <main className="w-full min-h-screen bg-gray-100 bg-opacity-25">
          <>
            {followerpopToggle && (
              <>
                <FollowerPopUpBox setFollowerPopToggle={setFollowerPopToggle} />
              </>
            )}
          </>
          <>
            {followingpopToggle && (
              <>
                <FollowingPopUpBox
                  setFollowingPopToggle={setFollowingPopToggle}
                />
              </>
            )}
          </>
          <div className="lg:w-8/12 lg:mx-auto mb-8">
            <header className="flex flex-wrap items-center p-4 md:py-8">
              <div className="md:w-3/12 md:ml-16">
                <img
                  className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                         border-2 border-pink-600 p-1"
                  src={
                    usersProfile.usersProfile.userProfile.profile != ""
                      ? usersProfile.usersProfile.userProfile.profile
                      : emptyProfile
                  }
                  alt="profile"
                />
              </div>
              <div className="w-8/12 md:w-7/12 ml-4">
                <div className="md:flex md:flex-wrap md:items-center mb-4">
                  <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                    {usersProfile.usersProfile.userProfile.username}
                  </h2>
                  {usersProfile.usersProfile.userProfile.bluetick && (
                    <img src={bluetick} alt="bluetick" className=" w-14 m-2" />
                  )}
                </div>
                <div>
                  {usersProfile.usersProfile.followToggle && (
                    <a
                      onClick={async () => {
                        await dispatch(
                          followUnfollow({
                            username,
                            token: localStorage.getItem("userToken"),
                          })
                        );
                        await dispatch(
                          getUsersProfile({
                            username,
                            token: localStorage.getItem("userToken"),
                          })
                        );
                      }}
                      href="#"
                      className="bg-blue-500 px-2 py-1 w-36
                            text-white font-semibold text-sm rounded block text-center 
                            sm:inline-block"
                    >
                      {usersProfile.usersProfile.followUnfollowToggle ? (
                        <span>Follow</span>
                      ) : (
                        <span>Unfollow</span>
                      )}
                    </a>
                  )}{" "}
                  <input
                    type="button"
                    className="bg-slate-500 px-2 py-1 w-36
                            text-white font-semibold text-sm rounded block text-center 
                            sm:inline-block"
                    value="Message"
                    onClick={() => {
                      navigate("/user/messages");
                    }}
                  />
                </div>

                <ul className="hidden md:flex space-x-8 mb-4">
                  <li>
                    <span className="font-semibold">
                      {usersProfile.usersProfile.userProfile.posts.length}
                    </span>{" "}
                    posts
                  </li>
                  <li>
                    <button
                      onClick={async () => {
                        setFollowerPopToggle(true);
                        setFollowingPopToggle(false);
                        await dispatch(
                          getFollowers({
                            token: localStorage.getItem("userToken"),
                            userId: usersProfile.usersProfile.userProfile._id,
                          })
                        );
                      }}
                    >
                      <span className="font-semibold">
                        {usersProfile.usersProfile.userProfile.followers.length}
                      </span>{" "}
                      <span>followers</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={async () => {
                        setFollowingPopToggle(true);
                        setFollowerPopToggle(false);
                        await dispatch(
                          getFollowing({
                            token: localStorage.getItem("userToken"),
                            userId: usersProfile.usersProfile.userProfile._id,
                          })
                        );
                      }}
                    >
                      <span className="font-semibold">
                        {usersProfile.usersProfile.userProfile.following.length}
                      </span>{" "}
                      <span>following</span>
                    </button>
                  </li>
                </ul>
                <div className="hidden md:block">
                  <h1 className="font-semibold">
                    {usersProfile.usersProfile.userProfile.fullname}
                  </h1>
                  <span>{usersProfile.usersProfile.userProfile.bio}</span>
                </div>
              </div>
            </header>
            <div className="px-px md:px-3">
              <ul
                className="flex items-center justify-around md:justify-center space-x-12  
                        uppercase tracking-widest font-semibold text-xs text-gray-600
                        border-t"
              >
                <li
                  onClick={() => {
                    navigate(`/user/posts/${username}`);
                  }}
                  className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
                >
                  <a className="inline-block p-3">
                    <i className="fas fa-th-large text-xl md:text-xs"></i>
                    <span className="hidden md:inline">post</span>
                  </a>
                </li>
              </ul>
              <div className="flex flex-wrap -mx-px md:-mx-3">
                {usersProfile.usersProfile.usersPosts.map((post) => {
                  return (
                    post.image && (
                      <div key={post._id} className="w-1/3 p-px md:px-3">
                        <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                          <img
                            className="w-full h-full absolute left-0 top-0 object-cover"
                            src={post.image}
                            alt="image"
                          />

                          <div
                            className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                    left-0 top-0 hidden"
                          >
                            <div
                              className="flex justify-center items-center 
                                        space-x-4 h-full"
                            >
                              <span className="p-2">
                                <i className="fas fa-heart"></i>{" "}
                                {post.likes.length}
                              </span>
                              <span className="p-2">
                                <i className="fas fa-comment"></i>{" "}
                                {post.comments.length}
                              </span>
                            </div>
                          </div>
                        </article>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default UserProfile;
