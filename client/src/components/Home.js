import React from "react";
import LeftSidebar from "./LeftSidebar";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="md:w-3/5 bg-white p-4">
        {/* Main Content */}
        {/* Add your content here */}
      </div>

      {/* Right Sidebar */}
      <div className="md:w-1/5 bg-gray-200 p-4 rounded-lg">
        {/* Right Sidebar Content */}
        {/* Add your content here */}
      </div>
    </div>
  );
};

export default Home;
