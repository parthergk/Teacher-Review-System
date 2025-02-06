import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { url } from "../mocks/url";

type Inputs = {
  collegeId: string;
  password: string;
};
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Inputs>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeID: data.collegeId,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errormsg = await response.json();
        throw new Error(errormsg.message);
      }

      const result = await response.json();
      setMessage(result.message);
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred while signing in.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="w-full m-auto flex flex-col justify-center items-center h-svh bg-gray-100">
      <h1 className="text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold mb-5">
        VIVEK GROUP OF COLLEGES
      </h1>
      <div className="px-5 xl:px-12 py-5 w-5/6 sm:w-2/3 lg:w-1/3 bg-primary flex flex-col rounded-md">
        <h1 className="text-center text-white font-bold text-3xl mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            placeholder="Enter Your CollegeId"
            type="text"
            defaultValue="BCA2020130"
            {...register("collegeId", { required: "College Id is required" })}
          />

          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            placeholder="Enter Your Password"
            type="password"
            defaultValue="gaurav@123"
            {...register("password")}
          />

          <button
            type="submit"
            className={`rounded font-medium ${
              isSubmitting ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            } xl:mt-6 py-2 text-lg`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <div className="text-lg text-[#FFD700] mt-5 text-center">
            {message}
          </div>
        )}
        <span className="text-white text-lg text-center mb-5 xl:my-5">
        Already have an account?{" "}
          <Link to={"/signin"}>
            <button className="text-white underline">SignIn</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
