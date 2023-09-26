import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import ErrorPage from "./ErrorPage";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div className="bg-gray-100 sticky z-1000 flex w-[100vw] h-auto top-0 border-b-4">
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
    errorElement: <ErrorPage />,
  }
]);

export default App;
