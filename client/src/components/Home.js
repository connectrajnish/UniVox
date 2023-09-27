import React from "react";
import LeftSidebar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Content from "./Content";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg min-h-screen overflow-y-auto">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="md:w-3/5 bg-white p-4 overflow-y-auto">
        <Content />
        <Content />
        <Content />
      </div>

      {/* Right Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg overflow-y-auto">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
