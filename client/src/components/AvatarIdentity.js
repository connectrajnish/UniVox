import { Avatar, Typography } from "@material-tailwind/react";

export default function AvatarIdentity({name, src, tag}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar
          src={src}
          alt="avatar"
          withBorder={true}
          className="p-0.5"
        />
        <div>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {tag}
          </Typography>
        </div>
      </div>
    </div>
  );
}
