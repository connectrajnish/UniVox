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
  const content = `It was a 4 round process.

  Round 1: Online Hackerrank Coding Assessment: The test was on 18th August 2022, and 3 coding questions were given to solve in 90 minutes.
  
  The first was a simple prefix and suffix array question.
  The second question was simple to moderate: https://www.geeksforgeeks.org/number-subarrays-product-less-k/
  The final question, which dealt with graph data structures, was also simple to moderate.
  The students who solved all the questions were selected further for the interview rounds. Out of 317 people, 20 were shortlisted for Interviews and I was fortunate enough to be one among them.
  
  The further rounds were 2 days after the result of the first round.
  
  Round 2: This interview was solely focused on data structures and algorithms, and it began with a brief introduction of the two of us before moving right into a coding question.
  
  The coding question was easy to medium. I told him about the brute force approach then he asked me to optimize. I did both things before time.
  Later on, he gave me edge cases in order to check my code reliability, furthermore, I also provided some edge cases and the code worked fine on all the cases.
  The round lasted for 45 minutes and I was selected for the further rounds.
  
  Round 3: It was a System design round. Though it also started with a brief introduction & later the interviewer gave me a question about designing a system similar to google excel sheets.  
  
  The interviewer made me feel at ease before we began by asking me to stop thinking of it as an interview and instead think of him or her as a colleague with whom I’m working to develop a system.
  It started by jotting down the functional and non-functional requirements of the system, then we had a discussion on building the API and the client-server architecture of the system. 
  Later, the interviewer asked me to design the database of the system and also to write the corresponding queries respectively. We further discussed optimizations of the system. 
  The round lasted for 1 hour and I was shortlisted for the further round.
  
  Round 4: It was a grad values and management round. No technical stuff was asked. But, a lot of resume discussion and Atlassian values questions were asked. Some of the questions include –
  
  Explain your project and your role. What were your learnings and what is the one mistake you won’t repeat in your future projects?
  Give me an example of a time when you had to teach.
  Tell me about a time when you received feedback and how you handled it.
  Tell me about a time when you and a peer had a conflict of interest and how you persuaded him to change his mind.
  Tell me about a time when you showed initiative and it had a positive effect.
  There were a lot of additional queries as well. The 60-65 minute round was completed.
  This concludes my interview experience with Atlassian. Hope this article helps to get an understanding of the interview process at Atlassian.
  
  Verdict: 5 students were selected and I was fortunate to be one of them.`;
  const name = "Catherine";
  const srcUrl =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80";
  const tag = "ECE Sophomore";
  // Truncate the content at the last space
  let truncatedContent =
    content.length > 100 ? content.substring(0, 100) + "..." : content;

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
              AvatarIdentity={
                <AvatarIdentity name={name} src={srcUrl} tag={tag} />
              }
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
