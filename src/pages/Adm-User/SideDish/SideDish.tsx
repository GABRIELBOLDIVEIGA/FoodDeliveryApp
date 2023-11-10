import { Card } from "src/components/ui/Card/Card"
import Header from "../Header/Header"
import { useContext } from "react"
import { LanguageContext } from "src/context/language/LanguageContenxt"

const SideDish = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section>
      <Header translateKey="SideDish.title" />

      <section className="py-20 px-2 bg-background">
        <Card className="p-2 text-center border border-border">
          {t('SideDish.message')}
        </Card>
      </section>
    </section>
  )
}

export default SideDish