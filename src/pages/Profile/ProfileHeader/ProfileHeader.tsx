import { ChevronLeftCircle } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "src/components/Avatar/Avatar";
import { LanguageContext } from "src/context/language/LanguageContenxt";

const Header = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="fixed top-0 z-10 flex justify-between items-center bg-background w-full shadow-md pl-4 pr-2 py-2">
      <Link to="/restricted/home">
        <ChevronLeftCircle className="text-primary" />
      </Link>
      <h3 className="font-bold tracking-wider">{t("profile.title")}</h3>
      <Link to="/restricted/profile">
        <Avatar urlImg="" className="w-[35px] h-[35px]"/>
      </Link>
    </div>
  );
};

export default Header;