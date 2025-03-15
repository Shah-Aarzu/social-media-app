import React from "react";

const Mystory = () => {
  return (
    <>
      <li className="flex flex-col items-center space-y-2">
        <div className="bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full p-1 relative">
          <a
            className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300"
            href="#"
          >
            <img
              className="h-20 w-20 rounded-full"
              src="https://i.ibb.co/yhh0Ljy/profile.jpg"
              alt="image"
            />
          </a>
          <button className="transition duration-500 absolute bottom-0 right-0 bg-blue-700 h-8 w-8 rounded-full text-white text-2xl font-semibold border-4 border-white flex justify-center items-center hover:bg-blue-900">
            +
          </button>
        </div>
        <p>you</p>
      </li>
    </>
  );
};

export default Mystory;
