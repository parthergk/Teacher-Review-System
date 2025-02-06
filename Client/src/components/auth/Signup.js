import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [collegeID, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const registerUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!collegeID || !password) {
        setMessage("Please enter your CollegeId Or Password");
        setIsSubmitting(false);
      } else {
        const response = await axios.post(
          `${url}/api/auth/register`,
          { collegeID, password }
        );

        setIsSubmitting(true);
        setMessage(response.data.message);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        setMessage(error.response.data.message || "An error occurred");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage(
          "No response received. Please check your network connection."
        );
      } else {
        console.error("Request setup error:", error.message);
        setMessage("An error occurred during the request setup.");
      }
    }
  };

return (
  <div className=" w-full m-auto flex flex-col justify-center items-center h-svh">
    <h1 className="  text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold mb-5">VIVEK GROUP OF COLLEGES</h1>
      <div className="px-5 xl:px-12 py-5 w-5/6 sm:w-2/3 lg:w-1/3 bg-primary flex flex-col rounded-md">
        <h1 className=" text-center text-white font-bold text-3xl mb-8">Sign Up</h1>
        <form onSubmit={registerUser} className=" flex flex-col gap-8">
          <input
            className=" text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="collegeId"
            placeholder="Enter Your CollegeId"
            type="text"
            value={collegeID}
            onChange={(e) => setCollegeId(e.target.value)}
          />
          <input
            className=" text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="password"
            placeholder="Enter A Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={`rounded ${isSubmitting?'bg-gray-200':'bg-white'}" xl:mt-6 py-2 text-lg"`}>SignUp</button>
        </form>
        <div className=" text-lg text-gray-400 mt-5 text-center">{message}</div>
        
        <span className=" text-white text-lg text-end mb-5 xl:my-5">Already have an account? <Link to={"/signin"}><button className=" text-white underline">Login</button></Link></span>
      </div>
    </div>
  );
};

export default Signup;
