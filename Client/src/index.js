import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './App';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Reviews from './components/reviews/Reviews';
import AddReview from './components/reviews/AddReview';
import SearchReview from './components/reviews/SearchReview';
import Home from './components/Home';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Reviews />,
        errorElement: <Error />
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <Error />
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <Error />
      },
      {
        path: '/home',
        element: <Home />,
        errorElement: <Error />,
        children: [
          {
            path: 'addreview',
            element: <AddReview />,
            errorElement: <Error />
          },
          {
            path: 'searchreview',
            element: <SearchReview />,
            errorElement: <Error />
          }
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
