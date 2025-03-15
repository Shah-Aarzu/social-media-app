import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postData } from "../redux/slices/post/Post.slice";
import { ToastContainer, Slide } from "react-toastify";
import { successNotification, errorNotification } from "../utils/Notifications";

const Create = () => {
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    content: "",
    image: null,
  });

  const postHandler = (e) => {
    if (e.target.name === "image") {
      setPost((prev) => {
        return { ...prev, [e.target.name]: e.target.files[0] };
      });
    } else {
      setPost((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("content", post.content);
    formData.append("token", localStorage.getItem("userToken"));

    try {
      if (post.content || post.image) {
        const res = await dispatch(postData(formData));
        successNotification(res.payload.data.message);
      } else {
        errorNotification("Atleast one field is required");
      }
    } catch (error) {
      errorNotification(error.message);
    }
  };

  return (
    <>
      <ToastContainer transition={Slide} />
      <div className="min-h-screen bg-gray-100 bg-opacity-25  py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-md rounded-3xl sm:p-10">
            <form encType="multipart/form-data" onSubmit={formHandler}>
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                    i
                  </div>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed">New Post</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">
                      create a new post then press create button
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">Post Content</label>
                      <input
                        type="text"
                        name="content"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Optional"
                        onChange={postHandler}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Post Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        onChange={postHandler}
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
