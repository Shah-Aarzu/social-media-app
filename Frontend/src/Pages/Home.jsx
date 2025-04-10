import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mystory from "../Components/Mystory";
import { getAllPosts } from "../redux/slices/post/GetAllPosts.slice";
import { like } from "../redux/slices/post/Post.slice";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import redHeart from "../utils/Image/redHeart.png";
import emptyHeart from "../utils/Image/emptyHeart.png";
import emptyProfile from "../utils/Image/empty-profile.avif";
import LikesPopUpBox from "../Components/LikesPopUpBox";
import { getLikes } from "../redux/slices/user/UserUtility.slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likePopUpToggle, setLikePopUpToggle] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts({ token: localStorage.getItem("userToken") }));
  }, []);

  const posts = useSelector((state) => state.getAllPosts);

  return (
    <>
      <ToastContainer transition={Slide} />
      {posts.status == "loading" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Loading...
        </div>
      )}
      {posts.status == "failed" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Check Your Internet Connection !!
        </div>
      )}
      {posts.status == "succeeded" && (
        <>
          {posts.posts.length > 0 ? (
            <>
              <section>
                {likePopUpToggle && (
                  <LikesPopUpBox setLikePopUpToggle={setLikePopUpToggle} />
                )}
                <div className="min-h-screen overflow-auto bg-gray-300 bg-opacity-25 flex items-center justify-center">
                  <ul className=" grid gap-5 p-5">
                    {posts.posts.map((post) => {
                      return (
                        <li key={post._id}>
                          <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={
                                    post.author.profile != ""
                                      ? post.author.profile
                                      : emptyProfile
                                  }
                                  alt="User Avatar"
                                  className=" w-12 h-12 rounded-full hover:cursor-pointer"
                                  onClick={() => {
                                    navigate(`/user/${post.author.username}`);
                                  }}
                                />
                                <div>
                                  <p
                                    className="text-gray-800 font-semibold hover:cursor-pointer"
                                    onClick={() => {
                                      navigate(`/user/${post.author.username}`);
                                    }}
                                  >
                                    {post.author.username}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    Posted at {post.createdAt}
                                  </p>
                                </div>
                              </div>
                              <div className="text-gray-500 cursor-pointer">
                                <button className="hover:bg-gray-50 rounded-full p-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="7" r="1" />
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="17" r="1" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            {post.image && (
                              <div className="mb-4">
                                <img
                                  src={post.image}
                                  alt="Post Image"
                                  className="w-full h-40 sm:h-80 object-cover rounded-md"
                                />
                              </div>
                            )}
                            <div>
                              <p>{post.caption}</p>
                            </div>
                            <div className="flex items-center justify-between text-gray-500">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={async () => {
                                    await dispatch(
                                      like({
                                        token:
                                          localStorage.getItem("userToken"),
                                        postId: post._id,
                                      })
                                    );
                                    await dispatch(
                                      getAllPosts({
                                        token:
                                          localStorage.getItem("userToken"),
                                      })
                                    );
                                  }}
                                  className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                                >
                                  {post.likes.includes(
                                    localStorage.getItem("userId")
                                  ) ? (
                                    <img
                                      className=" w-8"
                                      src={redHeart}
                                      alt="redHeart"
                                    />
                                  ) : (
                                    <img
                                      className=" w-8"
                                      src={emptyHeart}
                                      alt="emptyHeart"
                                    />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={async () => {
                                    setLikePopUpToggle(true);
                                    await dispatch(
                                      getLikes({
                                        token:
                                          localStorage.getItem("userToken"),
                                        postId: post._id,
                                      })
                                    );
                                  }}
                                >
                                  {post.likes.length} Likes
                                </button>
                              </div>
                              <button
                                onClick={() => {
                                  navigate(`/user/comment/${post._id}`);
                                }}
                                className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                              >
                                <svg
                                  width="22px"
                                  height="22px"
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                                    ></path>
                                  </g>
                                </svg>
                                <span>{post.comments.length} Comment</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </>
          ) : (
            <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
              No Posts !!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
