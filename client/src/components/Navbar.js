import { useState, createElement } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  LifebuoyIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NotificationsMenu } from "./NotificationsMenu";

const NavbarDark = () => {
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="sticky h-max max-w-full mx-auto from-blue-gray-900 to-blue-gray-800 px-4 py-3 rounded-t-none"
    >
      <div className="flex items-center justify-between gap-4 text-white w-full mr-4">
        {/* displays the text "UniVox" and serves as a clickable link. */}
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="cursor-pointer py-1.5"
        >
          UniVox
        </Typography>

        {/* search input field and field implemented using the <Input> component. */}
        <div className="relative flex-1 ml-auto max-w-[700px]">
          <Input
            type="search"
            color="white"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[100px]",
            }}
          />

          <Button
            type="button"
            onClick={() => {}}
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            <SearchIcon />
          </Button>
        </div>

        {/* <IconButton> components with icons for notifications(BellIcon) and ProfileMenu */}
        <div className="ml-auto flex gap-1 md:mr-4">
          <NotificationsMenu />
          <ProfileMenu />
        </div>
      </div>
    </Navbar>
  );
};

function SearchIcon() {
  return (
    <svg
      className="text-gray-600 h-4 w-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 56.966 56.966"
      style={{ enableBackground: "new 0 0 56.966 56.966" }}
      xmlSpace="preserve"
      width="512px"
      height="512px"
    >
      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
    </svg>
  );
}

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      {/* MenuHandler component is a wrapper around the button that triggers the menu to open or close */}
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-white p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 text-white transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      {/* The MenuItem component represents individual menu items. */}
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default NavbarDark;
