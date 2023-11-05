import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';

import PostDialog from "./PostDialog";
import AvatarIdentity from "./AvatarIdentity";

import { useUser } from "./shared/UserContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL;

export default function CardComponent({ post }) {
  console.log(post)
  const {state} = useUser();
  const name = post.user.name;
  const srcUrl = post.user.profilePhoto?post.user.profilePhoto:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const tag = post.user.status;

  const [userHasUpvoted, setUserHasUpvoted] = useState(post.upvotes.includes(state.user.id));
  // for dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [upvotes, setUpvotes] = useState(post.upvotes.length);
  const navigate = useNavigate;
  const handleUpvote = async () => {
    try {
      if(!state.isAuthenticated)
        navigate('/signin');
      // Make a POST request to the upvote route on the backend
      const response = await axios.post(`${API_URL}/post/upvote/${post._id}`, {}, { withCredentials: true });
  
      if (response.status === 200) {
        // The upvote was successful; you can update the upvotes count if needed
        const updatedUpvotes = response.data.upvotes;
        setUpvotes(updatedUpvotes.length);
        setUserHasUpvoted(updatedUpvotes.includes(state.user.id));
      } else {
        // Handle errors or provide feedback to the user
        console.error('Failed to upvote the post');
      }
    } catch (error) {
      console.error('Error occurred while upvoting the post', error);
    }
  };

  const MAX_CHARACTERS = 150;
  return (
    <Card className="mt-0 min-w-full">
      <CardHeader
        floated={false}
        color="transparent"
        className="m-0 rounded-lg"
      >
        {/* <Typography>{post.heading}</Typography> */}
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {post.heading}
        </Typography>
        <hr className="my-3" />
        <div
          dangerouslySetInnerHTML={{
            __html: truncateText(post.content, MAX_CHARACTERS),
          }}
        />
      </CardBody>
      <CardFooter className="pt-0 flex justify-between">
        <Button
          variant="text"
          onClick={handleUpvote}
          className="flex items-center justify-center"
        >
          {userHasUpvoted==false ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {/* Upvote SVG icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              {/* Downvote SVG icon */}
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                clipRule="evenodd"
              />
            </svg>
          )}
          &nbsp;
          {upvotes}
        </Button>

        <Button size="sm" onClick={handleOpen}>
          View More
        </Button>
        <PostDialog
          open={open}
          handleOpen={handleOpen}
          title={post.heading}
          content={post.content}
          AvatarIdentity={<AvatarIdentity name={name} src={srcUrl} tag={tag} />}
        />
      </CardFooter>
    </Card>
  );
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
