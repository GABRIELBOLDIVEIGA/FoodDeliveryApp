import defaultAvatar from "src/assets/avatarDefault.jpg";
import { cn } from "src/lib/utils";

type AvatarProps = {
  className?: string;
  urlImg: string;
};

const Avatar = ({ urlImg, className }: AvatarProps) => {
  return (
    <img
      src={urlImg}
      className={cn("rounded-full w-[50px] h-[50px]", className)}
      onError={(ev) => {
        ev.currentTarget.src = `${defaultAvatar}`;
      }}
    />
  );
};

export default Avatar;