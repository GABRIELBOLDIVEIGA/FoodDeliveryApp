import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "src/context/auth/AuthContext";
import { cn } from "src/lib/utils";
import { Category } from "src/validator/category/categorySchema";

const CardCategory = (category: Category) => {
  const [imgLoad, setImgLoad] = useState(false);
  const { user } = useContext(AuthContext)

  return (
    <Link key={category._id} to={`/${user?.role === 'adm' ? 'adm' : 'restricted' }/category/${category._id}`}>
      <div
        className={`relative shadow-md rounded-2xl overflow-hidden h-[200px] w-full`}
      >
        <p className="absolute bottom-0 w-full py-[6px] text-center text-secondary dark:text-secondary-foreground font-semibold bg-black bg-opacity-[0.6]">
          {category.name}
        </p>

        <div
          className={cn(
            "shadow-md rounded-2xl animate-pulse bg-secondary h-[200px] w-full",
            imgLoad && "sr-only",
          )}
        ></div>
        <img
          src={category.img}
          className="w-full"
          onLoad={() => setImgLoad(true)}
        />
      </div>
    </Link>
  );
};

export default CardCategory