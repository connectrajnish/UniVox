import React from "react";
import { Button } from "@material-tailwind/react";
const Profile = () => {
  return (
    <div className="h-full ">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1579591165250-987f23844669?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
            alt="Image"
          />
        </div>

        <div className="flex flex-col items-center -mt-20">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
            className="w-40 h-40 border-4 border-white rounded-full object-cover"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl text-black">Catherine</p>
          </div>
          <p className="text-gray-700">ECE Sophomore</p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <Button className="flex select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle text-white transition-all hover:shadow-lg  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            Message
          </Button>
        </div>
      </div>
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex flex-col w-full 2xl:w-2/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">About</h4>
              <p className="mt-2 text-gray-700 text-justify">
                Hello there! I'm Catherine, a sophomore in Electronics and
                Communications Engineering (ECE) at IIIT Dharwad. I have a deep
                passion for software development and enjoy working with the MERN
                stack to create web applications that solve real-world problems.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-xl text-gray-900 font-bold">Discover More</h4>
            <div className="flex justify-between mt-4">
              <a href="#" className="border border-gray-400 rounded-full p-2">
                <i className="ri-github-fill"></i>
              </a>
              <a href="#" className="border border-gray-400 rounded-full p-2">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="#" className="border border-gray-400 rounded-full p-2">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="#" className="border border-gray-400 rounded-full p-2">
                <i className="ri-mail-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-xl my-4 p-8">
        <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

          {/* <!-- start::Timeline item --> */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <p className="text-sm text-black">
                Profile informations changed.
              </p>
              <p className="text-xs text-gray-500">3 min ago</p>
            </div>
          </div>
          {/* <!-- end::Timeline item --> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
