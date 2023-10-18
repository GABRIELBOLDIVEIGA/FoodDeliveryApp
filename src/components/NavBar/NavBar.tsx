import { ClipboardList, Heart, Home, ShoppingCart, User2 } from "lucide-react";
import { cn } from "./../../lib/utils";
import { Link, useLocation } from "react-router-dom";

const barOption = [
  {
    id: "orders",
    icon: <ClipboardList size={24} />,
    link: "/restricted/#"
  },
  {
    id: "favorite",
    icon: <Heart size={24} />,
    link: "/restricted/#"
  },
  {
    id: "home",
    icon: <Home size={24} />,
    link: "/restricted/home"
  },
  {
    id: "cart",
    icon: <ShoppingCart size={24} />,
    link: "/restricted/#"
  },
  {
    id: "user",
    icon: <User2 size={24} />,
    link: "/restricted/#"
  },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <div
      className="
        fixed -bottom-1 flex justify-between items-center gap-2 w-full h-[50px] px-8 
        bg-muted shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)]
      "
    >
      {barOption.map((option) => {
        return (
          <Link
            to={option.link}
            key={option.id}
            className={cn(
              `p-3 rounded-full bg-transparent transition ease-in-out duration-300 `,
              location.pathname === option.link
                ? `bg-primary -translate-y-6 text-primary-foreground`
                : ``,
            )}
          >
            {option.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
