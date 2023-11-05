import React, { useState, useEffect } from "react";
import { Button, Input, Input, CardBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./shared/UserContext";
import axios from "axios";

const API_URL = process.env.API_URL;

const ProfileUpdateForm = () => {
  const { state, dispatch } = useUser();
  //   console.log(state);
  const navigate = useNavigate();
  const isContextReady = state.isContextReady;

  useEffect(() => {
    // Fetch user profile data using the username and populate the form fields
    if (isContextReady && !state.isAuthenticated) navigate("/signin");
    if (isContextReady) {
      if (state.isAuthenticated) {
        axios
          .get(`${API_URL}/user/${state.user.userName}`)
          .then((response) => setUserProfile(response.data)) // Use response.data
          .catch((error) =>
            console.error("Error fetching user profile: ", error)
          );
      }
    }
  }, [isContextReady]);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    about: "",
    college: "",
    yearOfStudy: 0,
    linkedin: "",
    github: "",
    twitter: "",
    profilePhoto: "",
    backgroundBanner: "",
  });
  const defaultPic = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const defaultBackgroundBanner =
    "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the updated profile data to the server
    if (profilePhotoFile) {
      userProfile.profilePhoto = profilePhotoFile;
    }
    if (backgroundBannerFile) {
      userProfile.backgroundBanner = backgroundBannerFile;
    }
  
    axios
      .put(`${API_URL}/user/${state.user.userName}`, userProfile, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Profile updated:", response.data);
        dispatch({ type: "UPDATE_PROFILE", user: response.data });
        alert("Profile updated Successfully");
      })
      .catch((error) => console.error("Error updating profile: ", error));
  };

  if (!isContextReady) {
    return <div>Loading...</div>;
  }
  // Add state variables to store selected files
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const [backgroundBannerFile, setBackgroundBannerFile] = useState(null);

  // Add file change handlers
 const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePhotoFile(file);

      // Create a preview of the selected profile photo
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleBackgroundBannerChange = (e) => {
    setBackgroundBannerFile(e.target.files[0]);
  };
  //   console.log(userProfile);
  return (
    <div className="h-full ">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px] overflow-hidden">
          <label
            htmlFor="backgroundBannerInput"
            className="cursor-pointer text-white text-lg"
          >
            {backgroundBannerFile ? (
              <img src={URL.createObjectURL(backgroundBannerFile)} alt="Image Preview" />
            ) : (
              <img
                src={
                  userProfile.backgroundBanner
                    ? userProfile.backgroundBanner
                    : defaultBackgroundBanner
                }
                className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
                alt="Image"
              />
            )}
          </label>
          <Input
            fullWidth
            id="backgroundBannerInput"
            type="file"
            name="backgroundBanner"
            style={{ display: "none" }}
            onChange={handleBackgroundBannerChange}
          />
        </div>

        <div className="flex flex-col items-center -mt-20">
        <label htmlFor="profilePhotoInput" className="cursor-pointer">
        {profilePhotoPreview ? (
            <img src={profilePhotoPreview} alt="Profile Photo" className="w-40 h-40 border-4 border-white rounded-full object-cover" />
          ) : (
            <img
              src={userProfile.profilePhoto ? userProfile.profilePhoto : defaultPic}
              className="w-40 h-40 border-4 border-white rounded-full object-cover"
              alt="Profile Photo"
            />
          )}
          
            
          </label>
          <Input
            fullWidth
            id="profilePhotoInput"
            type="file"
            name="profilePhoto"
            style={{ display: "none" }}
            onChange={handleProfilePhotoChange}
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl text-black">{userProfile.name}</p>
          </div>
          <p className="text-gray-700">{userProfile.status}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-xl pb-8 flex-1 items-center justify-center">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4 w-3/4 m-auto">
            <Input
              label="Name"
              type="text"
              name="name"
              value={userProfile.name}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Username"
              type="text"
              name="userName"
              value={userProfile.userName}
              onChange={handleChange}
              fullWidth
            />
            <Input
              disabled="true"
              label="Email"
              type="email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="About"
              multiline
              name="about"
              value={userProfile.about}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="College"
              type="text"
              name="college"
              value={userProfile.college}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Year of Study"
              type="number"
              name="yearOfStudy"
              value={userProfile.yearOfStudy}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="LinkedIn"
              type="text"
              name="linkedin"
              value={userProfile.linkedin}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="GitHub"
              type="text"
              name="github"
              value={userProfile.github}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Twitter"
              type="text"
              name="twitter"
              value={userProfile.twitter}
              onChange={handleChange}
              fullWidth
            />
            <Button fullWidth type="submit">
              Update Profile
            </Button>
          </CardBody>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
