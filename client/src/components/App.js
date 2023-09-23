import React from "react";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <div className=" bg-gray-100 fixed flex w-[100vw] h-auto top-0 border-b-4">
              <Navbar />
            </div> 
    </div>
  );
};

export default App;
