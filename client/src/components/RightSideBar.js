import React from "react";
import Chip from './Chip'
import { Link } from "react-router-dom"; // Import Link from React Router

const RightSideBar = ({ posts }) => {
  return (
    <div className="flex flex-col p-3">
      {/* Trending Posts */}
      <div className="mx-1 mt-5">
        <Chip icon={<TrendingIcon />} text={"Trending"} />
        {/* List of trending posts */}
        <div>
          {posts ? (
            posts.map((post) => (
              <div key={post._id} className="my-3 px-2">
                {/* Use the Link component to create a link to the post's page */}
                <Link to={`/post/${post._id}`}>{post.heading}</Link>
              </div>
            ))
          ) : (
            <p>Loading trending posts...</p>
          )}
        </div>
        {/* Add more trending posts as needed */}
      </div>
    </div>
  );
};



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
