import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import PostDialog from "./PostDialog";
import AvatarIdentity from "./AvatarIdentity";

export default function CardComponent() {
  const title = "Atlassian Interview Experience for SDE";
  const content = `The Atlassian Software Development Engineer (SDE) interview process comprised four rounds. The initial round included a Hackerrank coding assessment with three coding questions, leading to the selection of 20 candidates out of 317. The subsequent rounds involved technical assessments, system design discussions, and a values and management interview. In the end, five students, including the interviewee, were successfully chosen as part of Atlassian's rigorous evaluation process, encompassing both technical proficiency and alignment with the company's values.`;
  const name = "Catherine";
  const srcUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80";
  const tag = "ECE Sophomore";
  // Truncate the content at the last space
  let truncatedContent = content.length > 100 ? content.substring(0, 100) + "..." : content;

  // for dialog
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Card className="mt-0 min-w-full">
      <CardHeader
        floated={false}
        color="transparent"
        className="m-0 rounded-lg"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{truncatedContent}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {content.length > 100 && (
          <>
            <Button onClick={handleOpen}>View More</Button>
            <PostDialog
              open={open}
              handleOpen={handleOpen}
              title={title}
              content={content}
              AvatarIdentity={<AvatarIdentity name={name} src={srcUrl} tag={tag} />}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
