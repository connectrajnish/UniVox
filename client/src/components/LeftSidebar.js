import { Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col mt-3">
      <div className="mx-1 mt-5">
        <Link to="/post">
          <Button
            fullWidth
            className="flex flex-wrap items-center justify-center bg-black hover:bg-gray-900"
          >
            <PlusIcon className="h-5 w-5 mr-1" /> Discuss
          </Button>
        </Link>
      </div>
      <div>
        <hr className="my-5 mx-2 border-gray-700" />
      </div>

      <ExploreChip />

      <div className="flex flex-col py-4 px-1 ">
        {/* Repeat using map function */}
        <TopicButton linkHref={"#nowhere"} text={"Notes"} />
        <TopicButton linkHref={"#nowhere"} text={"Exam Tips"} />
        <TopicButton linkHref={"#nowhere"} text={"Career Tips"} />
        <TopicButton linkHref={"#nowhere"} text={"Campus Life"} />
        <TopicButton linkHref={"#nowhere"} text={"Clubs"} />
        <TopicButton linkHref={"#nowhere"} text={"Sports"} />
        <TopicButton linkHref={"#nowhere"} text={"Assignment Help"} />
        <TopicButton linkHref={"#nowhere"} text={"Job Opportunities"} />
        <TopicButton linkHref={"#nowhere"} text={"Interview Experience"} />
      </div>
    </div>
  );
};

function ExploreChip() {
  return (
    <div className="flex bg-gray-900 rounded-lg mx-1 px-2 py-2">
        <img
          className="bg-white rounded-full h-6 w-6"
          src="https://img.icons8.com/ios-filled/50/000000/compass--v2.png"
          alt="compass--v2"
        />
        <span className="text-white ml-2">Explore</span>
    </div>
  );
}

function TopicButton({ linkHref, text }) {
  return (
    <div className="m-1">
      <a href={linkHref}>
        <Button
          fullWidth
          variant="gradient"
          className="text-white px-3 py-2 rounded-full"
        >
          {text}
        </Button>
      </a>
    </div>
  );
}

export default LeftSidebar;
