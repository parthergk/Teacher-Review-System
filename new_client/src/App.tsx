import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className=" text-black">hello</div>
      <Outlet />
    </div>
  );
}

export default App;
