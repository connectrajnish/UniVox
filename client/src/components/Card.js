import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

// accept props like heading, content etc
export default function Card() {
  const title = "Atlassian Interview Experience for SDE";
  const content = `The Atlassian Software Development Engineer (SDE) interview process comprised four rounds.
    The initial round included a Hackerrank coding assessment with three coding questions,
    leading to the selection of 20 candidates out of 317. The subsequent rounds involved
    technical assessments, system design discussions, and a values and management interview.
    In the end, five students, including the interviewee, were successfully chosen as part
    of Atlassian's rigorous evaluation process, encompassing both technical proficiency and
    alignment with the company's values.`;

  // Find the last space character within the first 100 characters
  const lastSpaceIndex = content.lastIndexOf(" ", 100);

  // Truncate the content at the last space
  let truncatedContent =
    lastSpaceIndex === -1 ? content : content.substring(0, lastSpaceIndex);

  // Add three dots if content is truncated
  truncatedContent =
    content.length > truncatedContent.length
      ? truncatedContent + "..."
      : truncatedContent;

  return (
    <Card className="mt-0 min-w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{truncatedContent}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {content.length > 100 && <Button>View More</Button>}
      </CardFooter>
    </Card>
  );
}
