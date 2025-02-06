import React, { useState } from "react";
import { collegeData, departmentData } from "../mocks/data";
import { useForm, SubmitHandler } from "react-hook-form";
import {url} from '../mocks/url';

type Inputs = {
  collegeName: string;
  departmentName: string;
  teacherName: string;
  rating: number;
  review: string;
};

const AddReview = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [selectedCollege, setSelectedCollege] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | null>(null);
  const rating = [1, 2, 3, 4, 5];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${url}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to submit the review.");
      }

      const result = await response.json();
      setMessage(result.message || "Review submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="w-full lg:w-4/6 px-2 sm:px-10 md:px-20 sm:py-4 md:py-5 flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-primary font-bold mb-4 sm:mb-8 font-arial">
        Teacher Review
      </h1>

      <div className="w-full bg-white p-2 sm:p-5 md:px-8 rounded-sm shadow-md flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-sm shadow-md p-2 sm:p-4 md:p-5 flex flex-col items-center"
        >
          <div className="w-full">
            <label className="text-[1rem] md:text-lg text-gray-800">College Name :</label>
            <select
              defaultValue=""
              {...register("collegeName", { required: true })}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
            >
              <option value="">Select a college</option>
              {collegeData.map((college) => (
                <option value={college} key={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="text-[1rem] md:text-lg text-gray-800">Department Name :</label>
            <select
              defaultValue=""
              {...register("departmentName", { required: true })}
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
            >
              <option value="">Select a Department</option>
              {selectedCollege &&
                departmentData[selectedCollege as keyof typeof departmentData]?.map((department) => (
                  <option value={department} key={department}>
                    {department}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full">
            <label className="text-[1rem] md:text-lg text-gray-800">Teacher Name :</label>
            <input
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 px-1 focus:outline-none"
              defaultValue=""
              {...register("teacherName", { required: true })}
            />
          </div>

          <div className="w-full">
            <label className="text-[1rem] md:text-lg text-gray-800">Rating :</label>
            <select
              defaultValue=""
              {...register("rating", { valueAsNumber: true, required: true })}
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 focus:outline-none"
            >
              <option value="">Give the star</option>
              {rating.map((star) => (
                <option value={star} key={star}>
                  {star}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="text-[1rem] md:text-lg text-gray-800">Enter Your Review :</label>
            <textarea
              className="w-full block border border-gray-500 rounded-sm text-lg h-20 mb-2 mt-1 p-2 focus:outline-none"
              defaultValue=""
              {...register("review", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-sm"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-lg font-medium text-gray-800">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddReview;
