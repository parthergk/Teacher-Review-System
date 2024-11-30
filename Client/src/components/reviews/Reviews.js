import React, { useEffect, useState } from "react";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { url } from "../mocks/url";
import ReviewsShi from "../ReviewsShi";

export const Reviews = () => {
  const [responseData, setResponseData] = useState();
  const [responsemessage, setResponseMessage] = useState();
  const [reversedReviews, setReversedReviews] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setReversedReviews(responseData && responseData.reverse());
  }, [responseData]);

  const getReviews = async () => {
    try {
      const res = await fetch(`${url}/api/reviews`);
      if (res.status === 401) {
        const data = await res.json();
        setResponseMessage(data.message);
      } else {
        const data = await res.json();
        setResponseData(data);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        console.error("Server error:", error.response.data);
        setResponseMessage(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setResponseMessage(
          "No response received. Please check your network connection."
        );
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request setup error:", error.message);
        setResponseMessage("An error occurred during the request setup.");
      }
    }
  };
  useEffect(() => {
    getReviews();
  }, []);

  const checkAuth = (urls) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: urls } });
    } else {
      navigate(urls);
    }
  };

  return (
    <>
      <div className=" w-full pt-1 md:pt-5 sm:pt-3 flex flex-col items-center">
        <h1 className="  text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold">
          VIVEK GROUP OF COLLEGES
        </h1>
        <div className=" w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center ">
          <h1 className=" text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
            Teacher Reviews
          </h1>
          <div className=" w-full bg-white p-2 sm:p-5 rounded-sm shadow-md flex flex-col items-center">
            <div className=" flex justify-between w-full px-4 sm:px-10">
              <button
                onClick={() => {
                  checkAuth("/home/addreview");
                }}
                className=" bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-sm"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  checkAuth("/home/searchreview");
                }}
                className=" bg-primary font-normal text-white sm:text-xl sm:px-3 sm:py-2 text-sm p-1 rounded-sm"
              >
                Search Review
              </button>
            </div>
            {responseData ?  
              (<div className=" w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
                {reversedReviews ? (
                  reversedReviews.map((review) => (
                    <Review key={review._id} data={review} />
                  ))
                ) : (
                  <p>{responsemessage}</p>
                )}
              </div>): (<ReviewsShi/>)
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
