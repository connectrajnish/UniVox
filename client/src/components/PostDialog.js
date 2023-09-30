import React from "react";
import {
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DialogCustomAnimation({
  open,
  handleOpen,
  title,
  content,
}) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="justify-between">
        {title}
        <IconButton
          color="red"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody divider className="p-5 text-justify max-h-[30rem] overflow-scroll no-scrollbar">{content}</DialogBody>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
}
