import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <div className=' w-full pt-1 md:pt-5 sm:pt-3 flex flex-col items-center'>
    <h1 className="  text-center text-[1.65rem] sm:text-4xl md:text-5xl text-primary font-arial font-bold">VIVEK GROUP OF COLLEGES</h1>
      <Outlet />
    </div>
    <Analytics/>
    </>
  );
}

export default App;
