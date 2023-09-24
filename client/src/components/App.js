import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import ErrorPage from "./ErrorPage";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div className=" bg-gray-100 fixed flex w-[100vw] h-auto top-0 border-b-4">
        <Navbar />
      </div>
      <RouterProvider router={router}>
        <div>
          {/* Outlet will be filled dynamically i.e. conditional routing*/}
          <Outlet />
        </div>
      </RouterProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export default App;
