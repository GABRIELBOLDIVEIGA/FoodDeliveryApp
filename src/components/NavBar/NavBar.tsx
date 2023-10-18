import { ClipboardList, Heart, Home, ShoppingCart, User2 } from "lucide-react";
import { cn } from "./../../lib/utils";
import { useState } from "react";

const barOption = [
  {
    id: "orders",
    icon: <ClipboardList size={24} />,
  },
  {
    id: "favorite",
    icon: <Heart size={24} />,
  },
  {
    id: "home",
    icon: <Home size={24} />,
  },
  {
    id: "cart",
    icon: <ShoppingCart size={24} />,
  },
  {
    id: "user",
    icon: <User2 size={24} />,
  },
];

const NavBar = () => {
  const [active, setActive] = useState(barOption[2].id);

  return (
    <div
      className="
        fixed -bottom-1 flex justify-between items-center gap-2 w-full h-[50px] px-8 
        bg-muted shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)]
      "
    >
      {barOption.map((option) => {
        return (
          <div
            key={option.id}
            id={option.id}
            onClick={(ev) => setActive(ev.currentTarget.id)}
            className={cn(
              `p-3 rounded-full bg-transparent transition ease-in-out duration-300 `,
              active === option.id
                ? `bg-primary -translate-y-6 text-primary-foreground`
                : ``,
            )}
          >
            {option.icon}
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
