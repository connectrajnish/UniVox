import React from "react";
import {
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const RightSideBar = () => {
  return (
    <div className="flex flex-col p-3">
      {/* Trending Posts */}
      <div className="mx-1 mt-5">
        <CustomChip icon={<TrendingIcon />} text={"Trending"}/>
        {/* List of trending posts */}
        <div className="my-3 px-2">
          <a href="#trending-post-1">Trending Post 1</a>
        </div>
        <div className="my-3 px-2">
          <a href="#trending-post-2">Trending Post 2</a>
        </div>
        <div className="my-3 px-2">
          <a href="#trending-post-3">Trending Post 3</a>
        </div>
        {/* Add more trending posts as needed */}
      </div>

      <div>
        <hr className="my-5 mx-2 border-gray-700" />
      </div>

      {/* Related Questions */}
      <div className="mx-1">
        <CustomChip icon={<QuestionMarkCircleIcon className="text-white h-6 w-6" />} text={"Related"} />
        {/* List of related questions */}
        {/* Example: */}
        <div className="my-3 px-2">
          <a href="#related-question-1">Related Post 1</a>
        </div>
        <div className="my-3 px-2">
          <a href="#related-question-2">Related Post 2</a>
        </div>
        <div className="my-3 px-2">
          <a href="#related-question-3">Related Post 3</a>
        </div>
        {/* Add more related questions as needed */}
      </div>
    </div>
  );
};

function CustomChip({icon, text}) {
  return (
    <div className="flex flex-wrap bg-gray-900 rounded-lg mx-1 px-2 py-2">
        {icon}
        <span className="text-white ml-2">{text}</span>
    </div>
  );
}

function TrendingIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    </div>
  );
}

export default RightSideBar;
