import React, { useState } from "react";
import { collegeData, departmentData } from "../mocks/data";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  collegeName: string;
  departmentName: string;
  teacherName: string;
  rating: number;
  review: string;
};

const AddReview = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [selectedCollege, setSelectedCollege] = useState<string | undefined>(undefined);
  const rating = [1, 2, 3, 4, 5];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
            <label className="text-sm2 md:text-lg text-gray-800">College Name :</label>
            <select
              defaultValue=""
              {...register("collegeName")}
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
            <label className="text-sm2 md:text-lg text-gray-800">Department Name :</label>
            <select
              defaultValue=""
              {...register("departmentName")}
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
            <label className="text-sm2 md:text-lg text-gray-800">Teacher Name :</label>
            <input
              className="w-full block border border-gray-500 rounded-sm text-sm md:text-lg h-6 md:h-8 mb-2 mt-1 px-1 focus:outline-none"
              defaultValue=""
              {...register("teacherName")}
            />
          </div>

          <div className="w-full">
            <label className="text-sm2 md:text-lg text-gray-800">Rating :</label>
            <select
              defaultValue=""
              {...register("rating", { valueAsNumber: true })}
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
            <label className="text-sm2 md:text-lg text-gray-800">Enter Your Review :</label>
            <textarea
              className="w-full block border border-gray-500 rounded-sm text-lg h-20 mb-2 mt-1 p-2 focus:outline-none"
              defaultValue=""
              {...register("review")}
            />
          </div>
          <button
            type="submit"
            className="bg-primary font-normal text-white text-sm sm:text-xl sm:px-3 sm:py-2 px-2 py-1 rounded-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;