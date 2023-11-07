import React, { useState, useEffect } from "react";
import axios from "axios";
import ShimmerCard from "./Shimmer";
import LeftSidebar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Content from "./Content";

const API_URL = process.env.API_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [top3Posts, setTop3Posts] = useState([]); // State for top 3 posts

  useEffect(() => {
    // Fetch all posts from the backend when the component mounts
    axios
      .get(`${API_URL}/post`)
      .then((response) => {
        // Set the retrieved posts in the state
        setPosts(response.data);
        setLoading(false);

        // Calculate the top 3 posts
        const sortedPosts = [...response.data].sort((a, b) => b.upvotes.length - a.upvotes.length);
        setTop3Posts(sortedPosts.slice(0, 3));
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);



  return (
    <div className="flex flex-col md:flex-row p-0 m-0">
      {/* Left Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg max-h-screen overflow-y-auto no-scrollbar">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className="md:w-3/5 bg-white p-4 max-h-screen overflow-y-auto no-scrollbar">
        {loading ? (
          // Shimmer loading effect
          <ShimmerCard />
        ) : (
          <Content posts={posts} />
        )}
      </div>

      {/* Right Sidebar */}
      <div className="md:w-1/5 bg-gray-200 rounded-lg max-h-screen overflow-y-auto no-scrollbar">
        {!loading && <RightSideBar posts={top3Posts} />}
      </div>
    </div>
  );
};

export default Home;
