import { useContext } from "react";
import Menu from "src/components/Menu/Menu";
import { AuthContext } from "src/context/auth/AuthContext";
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { cn } from "src/lib/utils";

interface Props {
  translateKey?: string;
  title?: string;
  children?: JSX.Element
} 

const Header = ( { translateKey, title, children }: Props) => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext)

  return (
    <div
      className={cn(
        "fixed top-0 z-20 w-screen flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary",
      )}
    >
      <Menu />
      <div className="text-2xl font-semibold">{title ? title : t(`${translateKey}`)}</div>
      {children && user?.role === 'adm' ? children : <div className="w-[35px] h-[35px]"></div>}
    </div>
  );
};

export default Header;