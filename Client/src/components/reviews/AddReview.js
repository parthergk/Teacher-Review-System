import React, { useEffect, useState } from "react";
import { collegeData, departmentData } from "../mocks/data";
import axios from "axios";
import Review from "./Review";

const AddReview = () => {
  const rating = [1, 2, 3, 4, 5];
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStar, setSelectedStar] = useState("");
  const [givenReview, setGivenReview] = useState("");
  const [responseData, setResponseData] = useState();
  const [error, setError] = useState(null);
  const [reversedReviews, setReversedReviews] = useState();

  useEffect(()=>{
    setReversedReviews(responseData && responseData.reverse());
  },[responseData])

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const handleCollegeChange = handleInputChange(setSelectedCollege);
  const handleDepartmentChange = handleInputChange(setSelectedDepartment);
  const handleRatingChange = handleInputChange(setSelectedStar);

  const addReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://trsbackend.vercel.app/api/review",
        {
          collegeName: selectedCollege,
          departmentName: selectedDepartment,
          teacherName: selectedTeacher,
          rating: selectedStar,
          review: givenReview,
        },
        { headers: { Authorization: token } }
      );

      setResponseData(response.data)
      
      // Resetting all fields to empty values
      setSelectedCollege("");
      setSelectedDepartment("");
      setSelectedTeacher("");
      setSelectedStar("");
      setGivenReview("");
      setError(null); 
  
    } catch (error) {
      console.log(error);
      (error.response ? setError(error.response.data.message):setError(error.message || "An error occurred"));
    }
  };

  return (
    <div className=" w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className=" text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">Teacher Review</h1>


      <div className="w-full bg-white p-2 sm:p-5 md:px-8 rounded-sm shadow-md flex flex-col items-center">
      <form onSubmit={addReview} className="w-full rounded-sm shadow-md  p-2 sm:p-4 md:p-5 flex flex-col items-center">
       
        <div className=" w-full">
        <label className=" text-sm2 md:text-lg text-gray-800">College Name : </label>
        <select onChange={handleCollegeChange} value={selectedCollege} className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none">
          <option value="">Select a college</option>
          {collegeData.map((college) => (
            <option value={college} key={college}>
              {college}
            </option>
          ))}
        </select>
        </div>

        <div className=" w-full ">
        <label  className=" text-sm2 md:text-lg text-gray-800">Department Name : </label>
        <select onChange={handleDepartmentChange} value={selectedDepartment} className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none">
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
        <label className=" text-sm2 md:text-lg text-gray-800">Teacher Name : </label>
        <input
          className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 px-1 focus:outline-none"
          value={selectedTeacher}
          onChange={handleInputChange(setSelectedTeacher)}
        />
        </div>
        
        <div className=" w-full">
        <label className=" text-sm2 md:text-lg text-gray-800">Rating : </label>
        <select onChange={handleRatingChange} value={selectedStar} className=" w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none">
          <option value="">Give the star</option>
          {rating.map((star) => (
            <option value={star} key={star}>
              {star}
            </option>
          ))}
        </select>
        </div>

        <div className=" w-full">
        <label className=" text-sm2 md:text-lg text-gray-800">Enter Your Review : </label>
        <textarea
          className=" w-full block border border-gray-500 rounded-sm text-lg h-20 mb-2 mt-1 p-2 focus:outline-none"
          value={givenReview}
          onChange={handleInputChange(setGivenReview)}
        />
        </div >
        <button type="submit" className=" bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-sm">Submit</button>
      </form>

      <div className=" w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
        {
          (reversedReviews ? reversedReviews.map((review)=><Review key={review._id} data={review} />):<span>{error}</span>)
        }
      </div>
    </div>
    </div>
  );
};

export default AddReview;
