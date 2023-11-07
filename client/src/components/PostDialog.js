import React from "react";
import {
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

export default function PostDialog({
  open,
  handleOpen,
  title,
  content,
  AvatarIdentity,
  postId,
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
      <DialogHeader className="flex justify-between">
        {title}
        <div className="flex justify-between items-center gap-2">
          <Link to={`/post/${postId}`} className="text-blue-500 hover:text-blue-700 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </Link>

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
        </div>
      </DialogHeader>
      <DialogBody
        divider
        className="p-5 text-justify max-h-[30rem] overflow-scroll no-scrollbar"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </DialogBody>
      <DialogFooter className="text-left border-t-white">
        {AvatarIdentity}
      </DialogFooter>
    </Dialog>
  );
}
