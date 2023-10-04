import React from "react";
import LeftSidebar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Content from "./Content";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row p-0 m-0">
      {/* Left Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg max-h-screen overflow-y-auto no-scrollbar">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="md:w-3/5 bg-white p-4 max-h-screen overflow-y-auto no-scrollbar">
        <Content />
      </div>

      {/* Right Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg max-h-screen overflow-y-auto no-scrollbar">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
