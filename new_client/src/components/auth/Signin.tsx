import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
type Inputs = {
  collegeId:string,
  password:string
}
const Signin = () => {
  const { register, handleSubmit, formState: {isSubmitting } } = useForm<Inputs>();
  const onSubmit:SubmitHandler<Inputs> = (data)=>{
    console.log(data);
    
  }

  return (
    <div className="w-full m-auto flex flex-col justify-center items-center h-svh bg-gray-100">
      <h1 className="text-center text-md sm:text-4xl md:text-5xl text-primary font-arial font-bold mb-5">
        VIVEK GROUP OF COLLEGES
      </h1>
      <div className="px-5 xl:px-12 py-5 w-5/6 sm:w-2/3 lg:w-1/3 bg-primary flex flex-col rounded-md">
        <h1 className="text-center text-white font-bold text-3xl mb-8">
          Log In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            placeholder="Enter Your CollegeId"
            type="text"
            defaultValue=""
            {...register('collegeId', {required:'College Id is required'})}
          />

          <input
            className="text-white bg-transparent border border-white px-2 py-1 text-lg focus:outline-none"
            placeholder="Enter Your Password"
            type="password"
            defaultValue="password"
            {...register('password')}
          />

          <button
            type="submit"
            className={`rounded ${
              isSubmitting ? "bg-gray-200" : "bg-white"
            } xl:mt-6 py-2 text-lg`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logining" : "Login"}
          </button>
        </form>
        <div className="text-lg text-gray-400 mt-5 text-center">message</div>
        <span className="text-white text-lg text-end mb-5 xl:my-5">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <button className="text-white underline">SignUp</button>
          </Link>
        </span>
      </div>
      {/* <span className="my-5 px-7 text-center">
        <p className="text-lg font-medium">
          Login using this College ID and Password to test the app
        </p>
        <h1 className="text-center">
          <span className="font-medium">CollegeId :</span> BCA2020130
        </h1>
        <h1 className="text-center">
          <span className="font-medium">Password :</span> gaurav@123
        </h1>
        {isCopied ? (
          <span>Copied</span>
        ) : (
          <span onClick={clipCopy} className="cursor-pointer text-blue-500">
            Copy
          </span>
        )}
      </span> */}
    </div>
  );
};

export default Signin;
