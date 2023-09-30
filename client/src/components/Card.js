import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import DialogCustomAnimation from "./PostDialog";

export default function CardComponent() {
  const title = "Atlassian Interview Experience for SDE";
  const content = `The Atlassian Software Development Engineer (SDE) interview process comprised four rounds. The initial round included a Hackerrank coding assessment with three coding questions, leading to the selection of 20 candidates out of 317. The subsequent rounds involved technical assessments, system design discussions, and a values and management interview. In the end, five students, including the interviewee, were successfully chosen as part of Atlassian's rigorous evaluation process, encompassing both technical proficiency and alignment with the company's values.`;

  // Truncate the content at the last space
  let truncatedContent = content.length > 100 ? content.substring(0, 100) + "..." : content;

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
            <DialogCustomAnimation
              open={open}
              handleOpen={handleOpen}
              title={title}
              content={content}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
