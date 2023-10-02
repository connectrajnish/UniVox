import React from "react";
import {
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  CardHeader,
} from "@material-tailwind/react";

export default function PostDialog({
  open,
  handleOpen,
  title,
  content,
  AvatarIdentity,
}) {
  return (
    <Dialog
      size={"xl"}
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="justify-between">
        {title}
        <IconButton color="red" size="sm" variant="text" onClick={handleOpen}>
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
      <DialogBody
        divider
        className="p-5 text-justify max-h-[30rem] overflow-scroll no-scrollbar"
      >
        <CardHeader
          floated={false}
          color="transparent"
          className="mx-0 mt-0 mb-4 rounded-lg h-[375px]"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
          />
        </CardHeader>
        {content}
      </DialogBody>
      <DialogFooter className="text-left border-t-white">
        {AvatarIdentity}
      </DialogFooter>
    </Dialog>
  );
}
