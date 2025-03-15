import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/slices/post/GetAllPosts.slice";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Explore = () => {
  const dispatch = useDispatch();

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
            <main className="w-full bg-gray-100 bg-opacity-25 py-5">
              <div className="lg:w-8/12 lg:mx-auto mb-8">
                <div className="px-px md:px-3">
                  <div className="flex flex-wrap -mx-px md:-mx-3">
                    {posts.posts.map((post) => {
                      return (
                        post.image && (
                          <div key={post._id} className="w-1/3 p-px md:px-3">
                            <a href="#">
                              <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                                <img
                                  className="w-full h-full absolute left-0 top-0 object-cover"
                                  src={post.image}
                                  alt={post.caption}
                                />

                                <div
                                  className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                          left-0 top-0 hidden"
                                >
                                  <div
                                    className="flex justify-center items-center 
                                              space-x-4 h-full"
                                  >
                                    <span className="p-2">
                                      <i className="fas fa-heart"></i>{" "}
                                      {post.likes.length}
                                    </span>
                                    <span className="p-2">
                                      <i className="fas fa-comment"></i>{" "}
                                      {post.comments.length}
                                    </span>
                                  </div>
                                </div>
                              </article>
                            </a>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </main>
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

export default Explore;
