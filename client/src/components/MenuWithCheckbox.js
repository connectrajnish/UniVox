import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function MenuWithCheckbox({handleItemClick, selectedItems}) {
  
  const [openMenu, setOpenMenu] = useState(false);

  const items = [
    "Notes",
    "Exam Tips",
    "Career Tips",
    "Campus Life",
    "Clubs",
    "Sports",
    "Assignment Help",
    "Job Opportunities",
    "Interview Experience",
    "Other"
  ];


  return (
    <div>
      <Button
        variant="outlined"
        fullWidth={true}
        className="pl-3 flex items-center justify-between gap-3 text-sm font-normal capitalize tracking-normal text-blue-gray-500 border-blue-gray-200"
        onClick={() => setOpenMenu(!openMenu)}
      >
        Category
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`}
        />
      </Button>
      {openMenu && (
        <div className="menu-list flex flex-wrap">
          {items.map((item, index) => (
            <label
              key={index}
              htmlFor={`item-${index}`}
              className="flex cursor-pointer items-center gap-2 p-2"
            >
              <Checkbox
                ripple={false}
                id={`item-${index}`}
                containerProps={{ className: "p-0" }}
                checked={selectedItems.includes(item)}
                onChange={() => handleItemClick(item)}
                className="hover:before:content-none"
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
