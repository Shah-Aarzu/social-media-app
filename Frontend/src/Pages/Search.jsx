import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slices/user/GetUsers.slice";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification } from "../utils/Notifications";
import { useNavigate } from "react-router-dom";
import emptyProfile from "../utils/Image/empty-profile.avif";

const Search = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(getUsers({ search, token: localStorage.getItem("userToken") }));
    } catch (error) {
      errorNotification(error.message);
    }
  };

  return (
    <>
      <ToastContainer transition={Slide} />
      <nav className="bg-gray-100 bg-opacity-25 shadow px-48 border-b border-gray-400">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0"></div>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-12">
              <div className="max-w-lg w-full lg:max-w-xs">
                <form onSubmit={formHandler}>
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                      placeholder="Search"
                      type="search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {users.status == "loading" && (
        <div className="h-screen flex justify-center items-center">
          Loading...
        </div>
      )}
      {users.status == "failed" && (
        <div className="h-screen flex justify-center items-center">
          Check Your Internet Connection !!
        </div>
      )}
      {users.status == "succeeded" && (
        <>
          {users.users.length > 0 &&
            users.users.map((user) => {
              return (
                <div key={user._id} className="max-w-lg mx-auto items-center">
                  <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                    <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                      <div
                        onClick={() => {
                          navigate(`/user/${user.username}`);
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white"
                      >
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={user.profile != "" ? user.profile : emptyProfile}
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
                      <button className="bg-blue-500 text-white rounded py-1 px-2">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};

export default Search;
