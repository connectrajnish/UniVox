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
  const name = "Rajnish";
  const srcUrl = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";
  const tag = "MERN Developer";
  // Truncate the content at the last space
  let truncatedContent = content.length > 100 ? content.substring(0, 100) + "..." : content;

  // for dialog
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Card className="mt-0 min-w-full">
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
