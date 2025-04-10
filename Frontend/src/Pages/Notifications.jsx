import React, { useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllnotifications } from "../redux/slices/post/Notifications.slice";
import emptyProfile from "../utils/Image/empty-profile.avif";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllnotifications({ token: localStorage.getItem("userToken") }));
  }, []);

  const notifications = useSelector((state) => state.notifications);

  return (
    <>
      <ToastContainer transition={Slide} />
      {notifications.status == "loading" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Loading...
        </div>
      )}
      {notifications.status == "failed" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Check Your Internet Connection !!
        </div>
      )}
      {notifications.status == "succeeded" && (
        <>
          {notifications.notifications.length > 0 ? (
            <div className="max-w-lg mx-auto items-center">
              {notifications.notifications.map((notification) => {
                return (
                  <div key={notification._id}>
                    {notification.follow && (
                      <div
                        onClick={() => {
                          navigate(`/user/${notification.username}`);
                        }}
                        className=" hover:cursor-pointer flex justify-between px-3 py-1 bg-gray-100 bg-opacity-25 items-center gap-1 rounded-lg border border-gray-100 my-3"
                      >
                        <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={
                                notification.profile != ""
                                  ? notification.profile
                                  : emptyProfile
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div>
                            <span className="font-mono">
                              <span className=" text-xl">
                                {notification.username}
                              </span>{" "}
                              started following you
                            </span>
                          </div>
                          <div className="font-mono">
                            at {notification.createdAt}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="bg-blue-500 text-white rounded py-1 px-2">
                            Follow back
                          </button>
                        </div>
                      </div>
                    )}
                    {notification.comment && (
                      <div
                        key={notification._id}
                        onClick={() => {
                          navigate(`/user/${notification.username}`);
                        }}
                        className=" hover:cursor-pointer flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3"
                      >
                        <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={
                                notification.profile != ""
                                  ? notification.profile
                                  : emptyProfile
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div>
                            <span className="font-mono">
                              <span className="text-xl">
                                {notification.username}
                              </span>{" "}
                              comment on your Post
                            </span>
                          </div>
                          <div className="font-mono">
                            at {notification.createdAt}
                          </div>
                        </div>

                        <div className="relative w-16 h-16 rounded hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={notification.image}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {notification.like && (
                      <div
                        key={notification._id}
                        onClick={() => {
                          navigate(`/user/${notification.username}`);
                        }}
                        className=" hover:cursor-pointer flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3"
                      >
                        <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={
                                notification.profile != ""
                                  ? notification.profile
                                  : emptyProfile
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div>
                            <span className="font-mono">
                              <span className="text-xl">
                                {notification.username}
                              </span>{" "}
                              liked your Post
                            </span>
                          </div>
                          <div className="font-mono">
                            at {notification.createdAt}
                          </div>
                        </div>

                        <div className="relative w-16 h-16 rounded hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={notification.image}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
              No Notifications !!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Notifications;
