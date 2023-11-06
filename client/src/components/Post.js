import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import AvatarIdentity from "./AvatarIdentity";
const API_URL = process.env.API_URL;

import Content from "./Content";
import Chip from "./Chip";

export default function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isRelatedPostsLoading, setIsRelatedPostsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch the post data based on the ID
    axios
      .get(`${API_URL}/post/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data);
          // Fetch related posts based on the category ID
          if (response.data.category) {
            axios
              .get(
                `${API_URL}/post/categories/${response.data.category[0].name}`
              )
              .then((relatedResponse) => {
                if (relatedResponse.status === 200) {
                  setRelatedPosts(relatedResponse.data);
                  setIsRelatedPostsLoading(false);
                }
              })
              .catch((relatedError) => {
                console.error("Failed to fetch related posts", relatedError);
              });
          }
        } else if (response.status === 404) {
          setIsRelatedPostsLoading(false);
          setError("Post not found");
        } else {
          setIsRelatedPostsLoading(false);
          setError("Failed to fetch post");
        }
      })
      .catch((error) => {
        setIsRelatedPostsLoading(false);
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

  console.log(post)
  const name = post.user.name;
  const srcUrl = post.user.profilePhoto ? post.user.profilePhoto: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const tag = post.user.status;

  return (
    <div className="max-w-4xl px-4 m-auto text-blue-gray-900">
      <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
        <div className="flex items-center justify-between">
          <Typography variant="h2">{post.heading}</Typography>
          <AvatarIdentity
            className="mx-20"
            name={name}
            src={srcUrl}
            tag={tag}
          />
        </div>
        <hr className="my-3" />
        <div>
          <div
            variant="paragraph"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      <div className="mt-8 mb-2">
        <Chip
          icon={<QuestionMarkCircleIcon className="text-white h-6 w-6" />}
          text={"Related Posts"}
        />
        {!isRelatedPostsLoading && <Content posts={relatedPosts.posts} />}
      </div>
    </div>
  );
}
