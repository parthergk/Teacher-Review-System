import React, { useEffect, useState } from "react";
import { collegeData, departmentData } from "../mocks/data";
import Review from "./Review";
import axios from "axios";
import { url } from "../mocks/url";

export const SearchReview = () => {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [responseData, setResponseData] = useState();
  const [responsemessage, setResponseMessage] = useState(null);
  const [reversedReviews, setReversedReviews] = useState();

  useEffect(()=>{
    setReversedReviews(responseData && responseData.reverse());
  },[responseData])
  
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const handleCollegeChange = handleInputChange(setSelectedCollege);
  const handleDepartmentChange = handleInputChange(setSelectedDepartment);
  const handleTeacherChange = handleInputChange(setSelectedTeacher);

  const getReviews = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${url}/api/search`,
        {
          collegeName: selectedCollege,
          departmentName: selectedDepartment,
          teacherName: selectedTeacher,
        },
        { headers: { Authorization: token } }
      );

      const data = response.data;

      if (response.status === 401) {
        setResponseMessage(data.message);
      } else {
        if (data.length === 0) {
          setResponseMessage("No review found");
        } else {
          setResponseData(data);
        }

        // Resetting all fields to empty values
        setSelectedCollege("");
        setSelectedDepartment("");
        setSelectedTeacher("");
        // setResponseMessage(null);
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

  return (
    <>
      <div className=" w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
        <h1 className=" text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
          Search Review
        </h1>
        <div className="w-full bg-white p-2 sm:p-5 md:px-8 rounded-sm shadow-md flex flex-col items-center">
          <form
            onSubmit={getReviews}
            className="w-full rounded-sm shadow-md  p-2 sm:p-4 md:p-5 flex flex-col items-center"
          >
            <div className=" w-full">
              <label className=" text-sm2 md:text-lg text-gray-800">
                College Name :{" "}
              </label>
              <select
                onChange={handleCollegeChange}
                value={selectedCollege}
                className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
              >
                <option value="">Select a college</option>
                {collegeData.map((college) => (
                  <option value={college} key={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            <div className=" w-full ">
              <label className=" text-sm2 md:text-lg text-gray-800">
                Department Name :{" "}
              </label>
              <select
                onChange={handleDepartmentChange}
                value={selectedDepartment}
                className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
              >
                <option value="">Select a Department</option>
                {selectedCollege &&
                  departmentData[selectedCollege].map((department) => (
                    <option value={department} key={department}>
                      {department}
                    </option>
                  ))}
              </select>
            </div>

            <div className=" w-full">
              <label className=" text-sm2 md:text-lg text-gray-800">
                Teacher Name :{" "}
              </label>
              <input
                className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 px-1 focus:outline-none"
                value={selectedTeacher}
                onChange={handleTeacherChange}
              />
            </div>
            <button
              type="submit"
              className=" bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-sm"
            >
              Search
            </button>
          </form>
          <div className=" w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
            {reversedReviews ? (
              reversedReviews
                .map((review) => <Review key={review._id} data={review} />)
            ) :<span>{responsemessage}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchReview;
