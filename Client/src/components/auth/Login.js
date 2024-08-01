import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [collegeID, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      if (!collegeID || !password) {
        setMessage("Please enter your CollegeId or Password");
      } else {
        const response = await axios.post("https://teacher-review-system-three.vercel.app/api/auth/login", {
          collegeID,
          password,
        });

        localStorage.setItem('token', response.data.token);
        setMessage(response.data.message); // Set message from response data

        setTimeout(() => {
          navigate('/home/reviews');
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        setMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage('No response received. Please check your network connection.');
      } else {
        console.error("Request setup error:", error.message);
        setMessage('An error occurred during the request setup.');
      }
    }
  };

  const clipCopy = () => {
    setCollegeId("BCA2020130");
    setPassword("gaurav@123");
    setIsCopied(true);
  };

  return (
    <div className="w-full m-auto flex flex-col justify-center items-center h-svh bg-gray-100">
      <h1 className="text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold mb-5">VIVEK GROUP OF COLLEGES</h1>
      <div className="px-5 xl:px-12 py-5 w-5/6 sm:w-2/3 lg:w-1/3 bg-primary flex flex-col rounded-md">
        <h1 className="text-center text-white font-bold text-3xl mb-8">Log In</h1>
        <form onSubmit={loginuser} className="flex flex-col gap-8">
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="collegeId"
            placeholder="Enter Your CollegeId"
            type="text"
            value={collegeID}
            onChange={(e) => {
              setCollegeId(e.target.value);
            }}
          />

          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            name="password"
            placeholder="Enter Your Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit" className="bg-white xl:mt-6 py-2 text-lg">Login</button>
        </form>
        <div className="text-lg text-gray-400 mt-5 text-center">{message}</div>
        <span className="text-white text-lg text-end mb-5 xl:my-5">Don't have an account? <Link to={'/signup'}><button className="text-white underline">SignUp</button></Link></span>
      </div>
      <span className="my-5 px-7 text-center">
        <p className="text-lg font-medium">Login using this College ID and Password to test the app</p>
        <h1 className="text-center"><span className="font-medium">CollegeId :</span> BCA2020130</h1>
        <h1 className="text-center"><span className="font-medium">Password :</span> gaurav@123</h1>
        {isCopied ? <span>Copied</span> : <span onClick={clipCopy} className="cursor-pointer text-blue-500">Copy</span>}
      </span>
    </div>
  );
};

export default Login;
