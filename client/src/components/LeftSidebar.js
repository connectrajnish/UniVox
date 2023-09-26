import { Button, Chip } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col">
      <div className="mx-1 mt-5">
        <a href="#buttons-with-link">
          <Button
            fullWidth
            className="flex flex-wrap items-center justify-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" /> Discuss
          </Button>
        </a>
      </div>
      <div>
        <hr className="my-5 mx-2 border-gray-700" />
      </div>

      <div>
        <Chip
          className="mx-1 px-4"
          value="Explore"
          icon={
            <img
              className="bg-white rounded-full"
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/000000/compass--v2.png"
              alt="compass--v2"
            />
          }
        />
        <div className="flex flex-wrap items-center justify-between py-4 px-1">
          <TopicButton linkHref={"#nowhere"} text={"Notes"} />
          <TopicButton linkHref={"#nowhere"} text={"Exam Tips"} />
          <TopicButton linkHref={"#nowhere"} text={"Career Tips"} />
          <TopicButton linkHref={"#nowhere"} text={"Campus Life"} />
          <TopicButton linkHref={"#nowhere"} text={"Events"} />
          <TopicButton linkHref={"#nowhere"} text={"Interview Experience"} />
        </div>
      </div>
    </div>
  );
};

function TopicButton({ linkHref, text }) {
  return (
    <div className="m-1">
      <a href={linkHref}>
        <Button
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
