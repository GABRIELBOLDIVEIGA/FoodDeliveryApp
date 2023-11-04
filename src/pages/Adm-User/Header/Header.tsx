import { useContext } from "react";
import Menu from "src/components/Menu/Menu";
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { cn } from "src/lib/utils";

const Header = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className={cn(
        "fixed top-0 z-20 w-screen flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary",
      )}
    >
      <Menu />
      <div className="text-2xl font-semibold">{t("admOrders.title")}</div>
      <div className="w-[35px] h-[35px]"></div>
    </div>
  );
};

export default Header;