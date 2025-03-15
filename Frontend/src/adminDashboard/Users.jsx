import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slices/user/GetUsers.slice";
import { removeUser } from "../redux/slices/user/UserRemove.slice";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification } from "../utils/Notifications";
import { useNavigate } from "react-router-dom";
import emptyProfile from "../utils/Image/empty-profile.avif";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(
      getUsers({
        search: "allUsers",
        token: localStorage.getItem("adminToken"),
      })
    );
  }, []);

  return (
    <>
      <ToastContainer transition={Slide} />
      {users.status == "loading" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Loading...
        </div>
      )}
      {users.status == "failed" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Check Your Internet Connection !!
        </div>
      )}

      {users.status == "succeeded" && (
        <>
          {users.users.length > 0 ? (
            <div className="flex justify-center min-h-screen w-full bg-gray-100 bg-opacity-25">
              <div className=" mx-auto items-center py-5">
                <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                  <p className=" text-gray-800 font-semibold">Total Users</p>
                  <p className="text-gray-800 font-semibold">
                    {users.users.length}
                  </p>
                </div>
                {users.users.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3"
                    >
                      <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={
                              user.profile != "" ? user.profile : emptyProfile
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <span className="font-mono">
                          <span className=" text-xl">{user.username}</span>
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            await dispatch(
                              removeUser({
                                userId: user._id,
                                token: localStorage.getItem("adminToken"),
                              })
                            );
                            await dispatch(
                              getUsers({
                                search: "allUsers",
                                token: localStorage.getItem("adminToken"),
                              })
                            );
                          }}
                          className="bg-blue-500 text-white rounded py-1 px-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
              No Users !!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Search;
