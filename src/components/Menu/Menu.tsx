import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "src/components/ui/Sheet/Sheet";
import { Menu as MenuIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { cn } from "src/lib/utils";
import { AuthContext } from "src/context/auth/AuthContext";

const menuADM = [
  {
    to: "/home",
    translateKey: "header.home"
  },
  {
    to: "/products",
    translateKey: "header.about-me"
  },
  {
    to: "/categories",
    translateKey: "header.projects"
  },
  {
    to: "/users",
    translateKey: "header.skills"
  }
]

const menuUser = [
  {
    to: "/home",
    translateKey: "header.home"
  },
]

type MenuProps = {
  className?: string;
}

const Menu = ({ className }: MenuProps) => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState<typeof menuADM>()

  useEffect(() => {
    switch (user?.role) {
      case "adm":
        setMenu(menuADM)
        break;
      case "user":
        setMenu(menuUser)
        break;
      default:
        break;
    }
  }, [user])

  return (
    <div className={cn(className)}>
      <div >
        <Sheet>
          <SheetTrigger>
            <div className="bg-background inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground">
              <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="border-border">
            <SheetHeader className="h-full justify-between">
              <div>
                <SheetTitle>Menu</SheetTitle>
                <nav className="flex flex-col justify-end gap-4 pt-10">
                  {menu?.map((item, index) =>
                    <NavLink
                      className="hover:border-b-2 hover:border-border border-b-2 border-transparent font-semibold text-left text-xl"
                      key={index}
                      to={`${item.to}`}
                    >
                      {t(`${item.translateKey}`)}
                    </NavLink>
                  )}
                </nav>
              </div>

              <div className="flex flex-row gap-2 self-end text-secondary-foreground">
                <ToggleTheme />
                <ToggleLanguage />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* <div className="xs:hidden sm:flex">
        <nav className="flex gap-4">
          {menu?.map((item, index) =>
            <NavLink
              className="hover:border-b-2 hover:border-border border-b-2 border-transparent font-semibold"
              key={index}
              to={`${item.to}`}
            >
              {t(`${item.translateKey}`)}
            </NavLink>
          )}
        </nav>
      </div> */}
    </div >
  )
}

export default Menu;