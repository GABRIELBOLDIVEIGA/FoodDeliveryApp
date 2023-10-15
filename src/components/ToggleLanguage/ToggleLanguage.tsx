
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { LanguagesIcon } from "lucide-react"
import { useContext } from 'react';
import br_flag from "../../assets/br.png"
import us_flag from "../../assets/us.png"
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { Button } from "../ui/Button/Button";

const options: Array<{ icon: string, code: string, value: "en" | "pt" }> = [
  {
    icon: us_flag,
    code: "EN-US",
    value: "en"
  },
  {
    icon: br_flag,
    code: "PT-BR",
    value: "pt"
  },
]

const ToggleLanguage = () => {
  const translate = useContext(LanguageContext);

  const handleChangeLanguage = (value: string) => {
    if (translate.currentlanguage != value)
      translate.handleChangeLanguage();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-background">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="border-[1px] grid gap-1 rounded-lg p-1 w-[120px] bg-background  mt-2">
        {options.map((item, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="hover:cursor-pointer hover:outline-none"
            >
              <button
                onClick={() => handleChangeLanguage(item.value)}
                className="w-full hover:bg-secondary flex items-center gap-2 pl-2 py-1 rounded-sm"
              >
                <img src={item.icon} className="h-[1.2rem] w-[1.2rem]" />
                {item.code}
              </button>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggleLanguage