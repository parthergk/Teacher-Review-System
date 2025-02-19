import { useEffect, useState } from "react";
import Review from "./Review";
import ReviewsShi from "../ReviewsShi";
import { useNavigate } from "react-router-dom";
import {url} from '../mocks/url';

interface ReviewInf {
  _id?: string;
  collegeName?: string;
  departmentName?: string;
  teacherName?: string;
  rating?: number;
  review?: string;
}

const Reviews = () => {
  const [responseData, setResponseData] = useState<ReviewInf[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch(`${url}/api/reviews`);
      if (!response.ok) {
        setErrorMsg("Server side error");
        return;
      }
      const jsonData = await response.json();
      if (jsonData.reviews) {
        setResponseData(jsonData.reviews.reverse());
      } else {
        setErrorMsg("No reviews found");
      }
    } catch (error) {
      console.error("Error fetching the reviews", error);
      setErrorMsg("Error fetching the reviews");
    }
  };

  useEffect(() => {
    getData();
    isAuthenticated();
  }, []);

  async function isAuthenticated() {
    try {
      const response = await fetch(`${url}/api/auth/verify`, {
        credentials: "include",
      });
      const result = await response.json();
      setIsAuth(result.isAuthenticated);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    }
  }

  return (
    <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
        Teacher Reviews
      </h1>
      <div className="w-full bg-white p-2 sm:p-5 rounded-sm shadow-md flex flex-col items-center">
        <div className="flex justify-between w-full px-4 sm:px-10">
          <button
            onClick={() =>
              isAuth ? navigate("/addreview") : navigate("/signin")
            }
            className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 p-1 rounded-sm cursor-pointer"
          >
            Submit Review
          </button>
          <button
            onClick={() =>
              isAuth ? navigate("/searchreview") : navigate("/signin")
            }
            className="bg-primary font-normal text-white sm:text-xl sm:px-3 sm:py-2 text-sm p-1 rounded-sm cursor-pointer"
          >
            Search Review
          </button>
        </div>
        {responseData.length > 0 ? (
          <div className="w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
            {responseData.map((review) => (
              <Review key={review._id} {...review} />
            ))}
          </div>
        ) : errorMsg ? (
          <p className="text-red-500">{errorMsg}</p>
        ) : (
          <ReviewsShi />
        )}
      </div>
    </div>
  );
};

export default Reviews;
