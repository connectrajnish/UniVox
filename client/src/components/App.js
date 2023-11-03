import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Discuss from "./Discuss";
import ErrorPage from "./ErrorPage";
import Help from "./Help";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const [signInOrNot, setSignInOrNot] = useState(false);
  const handleSignInOrNot = () => setSignInOrNot(!signInOrNot);
  return (
    <div className="w-full flex flex-col">
      <div className="bg-gray-100 sticky z-1000 w-full flex h-auto top-0 border-b-4 rounded-b-xl">
        <Navbar signInOrNot={signInOrNot} handleSignInOrNot={handleSignInOrNot}/>
      </div>
      <div className="m-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn signInOrNot={signInOrNot} handleSignInOrNot={handleSignInOrNot}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post" element={<Discuss />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
