import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";

export default function TextareaDefault() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-3/4 ">
        <div className="mb-4">
          <Input size="lg" label="Heading" />
        </div>
        <div className="mb-4">
          <Textarea size="lg" label="Content" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" color="red" variant="text" className="rounded-md">
          Cancel
        </Button>
        <Button size="sm" className="rounded-md">
          Post
        </Button>
      </div>
    </div>
  );
}
