import { useContext } from "react"
import Avatar from "../Avatar/Avatar"
import Menu from "../Menu/Menu"
import { LanguageContext } from "src/context/language/LanguageContenxt"

const Header = () => {
  const { t } = useContext(LanguageContext)

  return (
    <div className="fixed top-0 z-20 w-screen flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary">
      <Menu />
      <div className="text-2xl font-semibold">{t('home.title')}</div>
      <Avatar urlImg="" />
    </div>
  )
}

export default Header 