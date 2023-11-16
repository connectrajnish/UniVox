import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Content from "./Content";

const API_URL = "http://localhost:8080"; // Replace with your API URL

const PostByCategory = () => {
  const { category } = useParams(); // Get the category parameter from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts by category
    const fetchPostsByCategory = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/post/categories/${category}`
        );
        setPosts(response.data.posts);
        setLoading(false); // Set loading to false when data is available
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchPostsByCategory();
  }, [category]);

  return (
    <div className="bg-gray-100 m-auto max-w-4xl p-4 border border-gray-300 rounded-lg">
      <Typography variant="h5">{category}</Typography>
      <div>
        <hr className="my-5 mx-2 border-gray-700" />
      </div>
      {loading ? <p>Loading...</p> : <Content posts={posts} />}
    </div>
  );
};

export default PostByCategory;
