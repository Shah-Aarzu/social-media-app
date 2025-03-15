import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/user/UserAuth.slice";
import { disconnectSocket } from "../redux/slices/user/SocketSlice";

const Sidenav = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch(disconnectSocket());
  };

  return (
    <>
      <aside className="h-screen  md:w-1/3 lg:w-1/4 md:block">
        <div className="h-screen sticky flex flex-col gap-2 p-4 text-sm border-r-2 border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Join</h2>
          <NavLink
            to="home"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="search"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Search
          </NavLink>
          <NavLink
            to="explore"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="messages"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="notifications"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Notifications
          </NavLink>
          <NavLink
            to="create"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Create
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="subscription"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Subscription
          </NavLink>
          <Link
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            onClick={logoutHandler}
          >
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidenav;
