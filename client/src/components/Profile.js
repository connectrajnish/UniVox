import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useParams, Link } from "react-router-dom";

const API_URL = process.env.API_URL;

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { username } = useParams(); // Get the username from the route parameter
  const defaultPic = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const defaultBackgroundBanner = "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  useEffect(() => {
    // Make an API call to fetch user profile data using the username
    // Replace 'your-api-endpoint' with the actual API endpoint
    fetch(`${API_URL}/user/${username}`)
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error("Error fetching user profile: ", error));
  }, [username]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  console.log(userProfile);
  return (
    <div className="h-full ">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px] overflow-hidden">
          <img
            src={
              userProfile.backgroundBanner ? userProfile.backgroundBanner : defaultBackgroundBanner
            }
            className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
            alt="Image"
          />
        </div>

        <div className="flex flex-col items-center -mt-20">
          <img
            src={
              userProfile.profilePhoto ? userProfile.profilePhoto : defaultPic
            }
            className="w-40 h-40 border-4 border-white rounded-full object-cover"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl text-black">{userProfile.name}</p>
          </div>
          <p className="text-gray-700">{userProfile.status}</p>
        </div>
        {/* <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
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
        </div> */}
      </div>
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex flex-col w-full 2xl:w-2/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">About</h4>
              <p className="mt-2 text-gray-700 text-justify">
                {userProfile.about}
              </p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-xl text-gray-900 font-bold">Discover More</h4>
            <div className="flex justify-between mt-4">
              {/* use regular anchor (<a>) elements with the href attribute pointing to the external URL. */}
              {userProfile.github && (
                <a
                  href={userProfile.github}
                  className="border border-gray-400 rounded-full p-2"
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Recommended for security
                >
                  <i className="ri-github-fill"></i>
                </a>
              )}

              {userProfile.linkedin && (
                <a
                  href={userProfile.linkedin}
                  className="border border-gray-400 rounded-full p-2"
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Recommended for security
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              )}

              {userProfile.twitter && (
                <a
                  href={userProfile.twitter}
                  className="border border-gray-400 rounded-full p-2"
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Recommended for security. The "noopener" attribute prevents the new tab or window from having access to the window.opener object of the original page. he noreferrer attribute ensures that no referrer information is sent to the linked page. This means that the target page won't know where the request is coming from, enhancing privacy.
                >
                  <i className="ri-twitter-fill"></i>
                </a>
              )}

              {userProfile.email && (
                <a
                  href={`mailto:${userProfile.email}`}
                  className="border border-gray-400 rounded-full p-2"
                  target="_blank" // Open email link in a new tab
                >
                  <i className="ri-mail-fill"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-xl my-4 p-8">
        <h4 className="text-xl text-gray-900 font-bold">Posts</h4>
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
