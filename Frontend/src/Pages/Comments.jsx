import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../redux/slices/post/Comments.slice";
import { ToastContainer, Slide } from "react-toastify";
import { successNotification, errorNotification } from "../utils/Notifications";
import { useParams } from "react-router-dom";
import emptyProfile from "../utils/Image/empty-profile.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Comments = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { postId } = useParams();
  const bottomRef = useRef();

  useEffect(() => {
    dispatch(
      getAllComments({ token: localStorage.getItem("userToken"), postId })
    );
  }, []);

  const comments = useSelector((state) => state.getAllComments);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [comments]);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      if (comment) {
        dispatch(
          getAllComments({
            token: localStorage.getItem("userToken"),
            comment,
            postId,
          })
        );
        setComment("");
        document.getElementById("commentBox").value = "";
      } else {
        errorNotification("Comment is Required");
      }
    } catch (error) {
      errorNotification(error.message);
    }
  };

  return (
    <>
      <ToastContainer transition={Slide} />
      {comments.status == "loading" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Loading...
        </div>
      )}
      {comments.status == "failed" && (
        <div className="h-screen flex justify-center items-center bg-gray-100 bg-opacity-25">
          Check Your Internet Connection !!
        </div>
      )}

      {comments.status == "succeeded" && (
        <div className="relative overflow-hidden h-screen">
          <header>
            <div className=" flex justify-between items-center bg-gray-100 absolute top-0 w-full p-3">
              <h3 className="font-semibold p-1">Comment Section</h3>
            </div>
          </header>
          <main>
            <div className=" overflow-auto w-full h-screen px-20 py-24 bg-zinc-50">
              {comments.comments.comments.length > 0 ? (
                comments.comments.comments.map((comment, index) => {
                  return (
                    <div key={index}>
                      <div
                        key={comment.commentId}
                        className="flex flex-col gap-5 m-3 "
                      >
                        <div>
                          <div className="flex w-full justify-between border rounded-md">
                            <div className="p-3">
                              <div className="flex gap-3 items-center">
                                <img
                                  src={
                                    comment.profile != ""
                                      ? comment.profile
                                      : emptyProfile
                                  }
                                  className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                />
                                <h3 className="font-bold">
                                  {comment.username}
                                </h3>
                              </div>
                              <p className="text-gray-600 mt-2">
                                {comment.comment}
                              </p>
                              <p className="text-gray-600 mt-2">
                                at {comment.createdAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div ref={bottomRef}></div>
                    </div>
                  );
                })
              ) : (
                <div className=" w-full h-full flex justify-center items-center">
                  No Comments !!
                </div>
              )}
            </div>
          </main>
          <footer>
            <form onSubmit={formHandler}>
              <div className=" bg-gray-100 p-3 flex gap-5 items-center absolute bottom-0 w-full">
                <FontAwesomeIcon
                  icon={faPlus}
                  className=" text-2xl text-slate-500"
                />
                <input
                  id="commentBox"
                  name="body"
                  placeholder="Comment"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className=" rounded-md outline-none p-3 w-full"
                />

                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className=" text-2xl text-slate-500"
                  type="submit"
                  onClick={formHandler}
                />
              </div>
            </form>
          </footer>
        </div>
      )}
    </>
  );
};

export default Comments;
