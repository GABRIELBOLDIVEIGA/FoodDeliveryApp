
import Avatar from "src/components/Avatar/Avatar"
import Menu from "src/components/Menu/Menu"
import { useContext } from "react"
import Banner from "./Banner/Banner"
import Categories from "./Categories/Categories"
import DailyDeal from "./DailyDeal/DailyDeal"
import { LanguageContext } from "src/context/language/LanguageContenxt"
import NavBar from "src/components/NavBar/NavBar"

const Home = () => {
  const { t } = useContext(LanguageContext)

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary">
        <Menu />
        <div className="text-2xl font-semibold">{t('home.title')}</div>
        <Avatar urlImg="" />
      </div>

      <div className="px-4 pt-24">
        <Banner />

        <Categories />

        <DailyDeal />
      </div>

      <NavBar />
    </div>
  )
}

export default Home