import {
  ClipboardList,
  Home,
  PackageSearch,
  ScrollText,
  ShoppingCart,
  User2,
  Users2,
} from "lucide-react";
import { cn } from "./../../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/auth/AuthContext";

type Option = {
  id: string,
  icon: JSX.Element,
  link: string
}

const barOptionClientUser: Array<Option> = [
  {
    id: "orders",
    icon: <ScrollText size={24} />,
    link: "/restricted/orders",
  },
  {
    id: "categories",
    icon: <ClipboardList size={24} />,
    link: "/restricted/categories",
  },
  {
    id: "home",
    icon: <Home size={24} />,
    link: "/restricted/home",
  },
  {
    id: "cart",
    icon: <ShoppingCart size={24} />,
    link: "/restricted/cart",
  },
  {
    id: "user",
    icon: <User2 size={24} />,
    link: "/restricted/profile",
  },
];

const barOptionAdmUser: Array<Option> = [
  {
    id: "categories",
    icon: <ClipboardList size={24} />,
    link: "/adm/categories",
  },
  {
    id: "products",
    icon: <PackageSearch size={24} />,
    link: "/adm/products",
  },
  {
    id: "orders",
    icon: <ScrollText size={24} />,
    link: "/adm/orders",
  },
  {
    id: "sidedish",
    icon: <ClipboardList size={24} />,
    link: "/adm/sidedish",
  },
  {
    id: "users",
    icon: <Users2 size={24} />,
    link: "/adm/users",
  },
]

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [options, setOptions] = useState<Array<Option>>()

  useEffect(() => {
    switch (user?.role) {
      case 'adm':
        setOptions(barOptionAdmUser)
        break;
      case 'user':
        setOptions(barOptionClientUser)
        break;
      default:
        break;
    }
  }, [user?.role])


  return (
    <div
      className="
        fixed -bottom-1 flex justify-between items-center gap-2 w-full h-[50px] px-8 
        bg-muted shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)]
      "
    >
      {options?.map((option) => {
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
