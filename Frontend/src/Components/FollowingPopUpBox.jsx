import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import emptyProfile from "../utils/Image/empty-profile.avif";
import bluetick from "../utils/Image/verify.png";
import { useNavigate } from "react-router-dom";

function FollowingPopUpBox({ setFollowingPopToggle }) {
  const following = useSelector((state) => state.userUtility);
  const navigate = useNavigate();

  const submitHandler = () => {
    setFollowingPopToggle(false);
  };
  return (
    <>
      <div
        className=" bg-black bg-opacity-75 p-5 h-1/2  rounded-md fixed z-10"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p className="text-white text-center">Following</p>
        <button
          type="button"
          className=" absolute z-20 text-white text-lg bg-red-500 p-3 rounded-full -right-3 -top-3"
          onClick={submitHandler}
        >
          <ImCross />
        </button>
        <div
          className=" h-full w-full overflow-y-auto overflow-x-hidden"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {following.status == "loading" && (
            <div className="h-full w-80 flex justify-center items-center text-white">
              Loading...
            </div>
          )}
          {following.status == "failed" && (
            <div className="h-full w-80 flex justify-center items-center text-white">
              Check Your Internet Connection !!!
            </div>
          )}
          {following.userUtilityData.length > 0 ? (
            following.userUtilityData.map((following, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/user/${following.username}`);
                }}
                className="flex w-80 hover:cursor-pointer justify-between px-3 py-1 bg-gray-100 items-center gap-1 rounded-lg border border-gray-100 my-3"
              >
                <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={
                        following.profile != ""
                          ? following.profile
                          : emptyProfile
                      }
                      alt="profile"
                    />
                  </div>
                </div>
                <div>
                  <p className=" flex items-center">
                    {following.username ? following.username : ""}{" "}
                    <span>
                      {following.bluetick && (
                        <img src={bluetick} alt="bluetick" className=" w-8" />
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  <p>{following.fullname ? following.fullname : ""}</p>
                </div>
                {/* <div>
                  <input
                    type="button"
                    value="Following"
                    className=" bg-slate-500 px-2 py-1 w-36
                            text-white font-semibold text-sm rounded block text-center 
                            sm:inline-block"
                  />
                </div> */}
              </div>
            ))
          ) : (
            <div className="h-full w-80 flex justify-center items-center text-white">
              No Followings !!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FollowingPopUpBox;
