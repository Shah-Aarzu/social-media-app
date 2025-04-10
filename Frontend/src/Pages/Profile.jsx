import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slices/user/UserProfile.slice";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emptyProfile from "../utils/Image/empty-profile.avif";
import { useNavigate } from "react-router-dom";
import bluetick from "../utils/Image/verify.png";
import FollowerPopUpBox from "../Components/FollowerPopUpBox";
import FollowingPopUpBox from "../Components/FollowingPopUpBox";
import {
  getFollowers,
  getFollowing,
} from "../redux/slices/user/UserUtility.slice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [followerpopToggle, setFollowerPopToggle] = useState(false);
  const [followingpopToggle, setFollowingPopToggle] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile({ token: localStorage.getItem("userToken") }));
  }, []);

  const userProfile = useSelector((state) => state.userProfile);

  return (
    <>
      <ToastContainer transition={Slide} />
      {userProfile.status == "loading" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Loading...
        </div>
      )}
      {userProfile.status == "failed" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Check Your Internet Connection !!!
        </div>
      )}
      {userProfile.status == "succeeded" && (
        <>
          {userProfile.userProfile != null && (
            <main className=" min-h-screen w-full bg-gray-100 bg-opacity-25">
              <>
                {followerpopToggle && (
                  <>
                    <FollowerPopUpBox
                      setFollowerPopToggle={setFollowerPopToggle}
                    />
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
                <header className="flex justify-center flex-wrap items-center p-4 md:py-8">
                  <div className=" md:w-3/12 md:ml-16">
                    <img
                      className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                         border-2 border-pink-600 p-1"
                      src={
                        userProfile.userProfile.userProfile.profile != ""
                          ? userProfile.userProfile.userProfile.profile
                          : emptyProfile
                      }
                      alt="profile"
                    />
                  </div>
                  <div className="w-8/12 md:w-7/12 ml-4">
                    <div className="md:flex md:flex-wrap md:items-center mb-4">
                      <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                        {userProfile.userProfile.userProfile.username}
                      </h2>
                      {userProfile.userProfile.userProfile.bluetick && (
                        <img
                          src={bluetick}
                          alt="bluetick"
                          className=" w-14 m-2"
                        />
                      )}

                      <span className="w-36 text-base font-semibold text-gray-700 mr-2">
                        <button
                          className="w-full bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                          onClick={() => {
                            navigate("/user/updateProfile");
                          }}
                        >
                          Edit Profile
                        </button>
                      </span>
                    </div>
                    <div className="flex pb-3"></div>
                    <ul className=" md:flex space-x-8 mb-4">
                      <li>
                        <span className="font-semibold">
                          {userProfile.userProfile.userProfile.posts.length}
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
                              })
                            );
                          }}
                        >
                          <span className="font-semibold">
                            {
                              userProfile.userProfile.userProfile.followers
                                .length
                            }
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
                              })
                            );
                          }}
                        >
                          <span className="font-semibold">
                            {
                              userProfile.userProfile.userProfile.following
                                .length
                            }
                          </span>{" "}
                          <span>following</span>
                        </button>
                      </li>
                    </ul>
                    <div>
                      <h1 className="font-semibold">
                        {userProfile.userProfile.userProfile.fullname}
                      </h1>
                      <span>{userProfile.userProfile.userProfile.bio}</span>
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
                        navigate(
                          `/user/posts/${userProfile.userProfile.userProfile.username}`
                        );
                      }}
                      className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
                    >
                      <a className="inline-block p-3">
                        <i className="fas fa-th-large text-xl md:text-xs"></i>
                        <span className="">post</span>
                      </a>
                    </li>
                  </ul>
                  <div className="flex flex-wrap -mx-px md:-mx-3">
                    {userProfile.userProfile.userPosts.map((post) => {
                      return (
                        post.image && (
                          <div
                            key={post._id}
                            className="w-full md:w-1/3 sm:w-2/4 p-px md:px-3"
                          >
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
      )}
    </>
  );
};

export default Profile;
