

const ReviewsShi = () => {
  return (
    <div className=" w-full rounded-sm shadow-md mt-5 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className=" h-[174px] border border-gray-300 w-full flex flex-col px-1 sm:px-3 sm:py-1 rounded-sm">
          <h1 className=" bg-gray-100 h-9 text-gray-800 font-bold text-2xl sm:text-3xl"></h1>
          <span className=" bg-gray-100 h-6 text-primary text-[1rem] sm:text-xl font-bold sm:my-1"></span>
          <span className=" bg-gray-100 h-14 text-gray-800 font-medium sm:text-xl">
            {" "}
            <p className=" inline font-normal"></p>{" "}
          </span>
          <span className=" bg-gray-100 h-6 text-gray-800 font-medium sm:text-xl sm:my-1">
            {" "}
            <p className=" inline font-normal"></p>{" "}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReviewsShi;
