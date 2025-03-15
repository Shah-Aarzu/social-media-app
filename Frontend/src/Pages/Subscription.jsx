import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successNotification, errorNotification } from "../utils/Notifications";
import { loadStripe } from "@stripe/stripe-js";
import { payment, stripeSessionId } from "../redux/slices/user/Payment.slice";
import { getUserProfile } from "../redux/slices/user/UserProfile.slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripePromise = loadStripe(
    "pk_test_51QwFGIA3mQAjq0KwndYdHRUqf6tJv0A8y6fVd3W9I5dPd48ku6cL5yAypampwET1kALycOLnXAepfAaMkyiMdavh0008BJCtwt"
  );

  useEffect(() => {
    dispatch(getUserProfile({ token: localStorage.getItem("userToken") }));
  }, []);

  const userProfile = useSelector((state) => state.userProfile);

  const makePayment = async (e) => {
    e.preventDefault();

    try {
      if (
        userProfile &&
        userProfile.userProfile &&
        userProfile.userProfile.userProfile &&
        userProfile.userProfile.userProfile.bluetick
      )
        errorNotification("You are already subscripted");
      else {
        const stripe = await stripePromise;

        const res = await dispatch(
          stripeSessionId({ token: localStorage.getItem("userToken") })
        );
        if (!res || !res.payload || !res.payload.data.id) {
          errorNotification("Invalid session response from server.");
        }

        const result = await stripe.redirectToCheckout({
          sessionId: res.payload.data.id,
        });
        if (result.error) errorNotification(result.error);
      }
    } catch (error) {
      errorNotification(error.message);
    }
  };

  const stripeSubmit = async () => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("success")) {
      await dispatch(payment({ token: localStorage.getItem("userToken") }));
      await dispatch(
        getUserProfile({ token: localStorage.getItem("userToken") })
      );
      successNotification("Payment successful! Thank you for subscribing.");
    } else if (queryParams.get("canceled")) {
      errorNotification("Payment was canceled. Please try again.");
    }
  };
  useEffect(() => {
    stripeSubmit();
  }, [location]);
  return (
    <>
      <ToastContainer transition={Slide} />
      <section className=" min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full border-2 border-orange-500 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Bluetick Subscription
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={makePayment}>
                <div>
                  <input
                    type="number"
                    name="bluetick"
                    id="bluetick"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Rs 500"
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Pay
                </button>
                <div className="text-center"></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
