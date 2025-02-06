// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchReview from "./components/reviews/SearchReview.tsx";
import Reviews from "./components/reviews/Reviews.tsx";
import AddReview from "./components/reviews/AddReview.tsx";
import Signin from "./components/auth/Signin.tsx";
import Signup from "./components/auth/Signup.tsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error loading the Page</div>,
    children: [
      {
        path: "/",
        element: <Reviews />,
        errorElement: <div>Error loading the Get reviews page</div>,
      },
      {
        path: "/addreview",
        element: <AddReview />,
        errorElement: <div>Error loading the Add reviews page</div>,
      },
      {
        path: "/searchreview",
        element: <SearchReview />,
        errorElement: <div>Error loading the Search reviews page</div>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>Error loading the Signup page</div>,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <div>Error loading the Signin page</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <RouterProvider router={appRouter} />
  // </StrictMode>
);
