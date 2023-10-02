import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ErrorPage from "./ErrorPage";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";



const App = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-gray-100 sticky z-1000 w-full flex h-auto top-0 border-b-4 rounded-b-xl">
        <Navbar />
      </div>
      <div className="m-2">
        <RouterProvider router={router}>
          {/* Outlet will be filled dynamically i.e. conditional routing*/}
          <Outlet />
        </RouterProvider>
      </div>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  }
]);
export default App;
