import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideNav from "./adminDashboard/AdminSideNav";
const AppAdmin = () => {
  return (
    <div className="h-screen overflow-hidden flex">
      <AdminSideNav />
      <div className="w-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AppAdmin;
