import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import ProfileUpdate from "./ProfileUpdate";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Discuss from "./Discuss";
import ErrorPage from "./ErrorPage";
import Help from "./Help";
import Post from "./Post";
import PostByCategory from "./PostByCategory";
import SearchResult from './SearchResult';
import { useUser } from "./shared/UserContext";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const {state} = useUser();

  if(!state.isContextReady)
    return <div>Loading...</div>

  return (
    <div className="w-full flex flex-col">
      <div className="bg-gray-100 sticky z-1000 w-full flex h-auto top-0 border-b-4 rounded-b-xl">
        <Navbar />
      </div>
      <div className="m-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/update-profile" element={<ProfileUpdate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post" element={<Discuss />} />
          <Route path="/post/search" element={<SearchResult />} />
          <Route path="/post/explore/:category" element={<PostByCategory />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
