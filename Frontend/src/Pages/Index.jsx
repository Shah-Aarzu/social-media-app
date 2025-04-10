import React from "react";
import { Link } from "react-router-dom";
import background from "../utils/Image/background.png";

const Index = () => {
  return (
    <>
      <div
        className=" min-h-screen grid justify-items-center gap-10 p-20  sm:flex sm:justify-center sm:items-center sm:gap-24  overflow-auto"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="w-full sm:w-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 overflow-auto dark:border-gray-700 text-center">
          <i className="fa-solid fa-user text-9xl pt-5"></i>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              User Login
            </h5>
            <Link
              to={"userlogin"}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Click Here
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 overflow-auto dark:border-gray-700 text-center">
          <i className="fa-solid fa-user-secret text-9xl pt-5"></i>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Admin Login
            </h5>
            <Link
              to={"adminlogin"}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Click Here
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
