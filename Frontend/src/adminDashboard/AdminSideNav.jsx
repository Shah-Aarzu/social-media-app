import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/admin/AdminAuth.slice";

const AdminSideNav = () => {
  const dispatch = useDispatch();

  return (
    <>
      <aside className="h-screen  md:w-1/3 lg:w-1/4 md:block">
        <div className="h-screen sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Join</h2>
          <NavLink
            to="posts"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive, isPending }) =>
              isActive
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : "flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            }
          >
            Users
          </NavLink>
          <Link
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
            onClick={() => dispatch(adminLogout())}
          >
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSideNav;
