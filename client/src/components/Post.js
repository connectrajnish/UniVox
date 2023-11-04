import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
} from "@material-tailwind/react";
import AvatarIdentity from './AvatarIdentity'
const API_URL = process.env.API_URL;

export default function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the post data based on the ID
    axios
      .get(`${API_URL}/post/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data);
        } else if (response.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to fetch post");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch post", error);
      });
  }, [id]);

  if (error) {
    return (
      <Typography variant="h5" color="error">
        Error: {error}
      </Typography>
    );
  }

  if (!post) {
    return <div>Loading...</div>;
  }
  const name = "Catherine";
  const srcUrl =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80";
  const tag = "ECE Sophomore";
  
  return (
    <div className="max-w-4xl px-4 m-auto text-blue-gray-900">
      <div className="flex items-center justify-between">
        <Typography variant="h2">{post.heading}</Typography>
        <AvatarIdentity className="mx-20" name={name} src={srcUrl} tag={tag} />
      </div>
      <hr className="my-3" />
      <div>
        <div
          variant="paragraph"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <hr className="my-3" />
      <div>
        <Typography>Related Posts</Typography>
      </div>
    </div>
  );
}
