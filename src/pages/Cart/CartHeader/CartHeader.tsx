import { ChevronLeftCircle, Link } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "src/context/language/LanguageContenxt";

const Header = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="fixed top-0 z-10 flex justify-between bg-background w-full shadow-md px-4 py-3">
      <Link to="/restricted/home">
        <ChevronLeftCircle className="text-primary" />
      </Link>
      <h3 className="font-bold tracking-wider">{t("cart.title")}</h3>
      <div className="w-[24px]"></div>
    </div>
  );
};

export default Header;
