
import Avatar from "src/components/Avatar/Avatar"
import Menu from "src/components/Menu/Menu"
import { Button } from "src/components/ui/Button/Button"
import { Card } from "src/components/ui/Card/Card"
import burger from "src/assets/burger.jpg"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
  const [categories, setCategories] = useState<Array<any>>()

  useEffect(() => {
    axios.get("http://localhost:3000/category")
      .then((res) => { console.log(res.data); setCategories(res.data) })
      .catch((err) => { console.log(err) })
      .finally(() => { console.log("fim...") })
  }, [])

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary">
        <Menu />
        <div>Home</div>
        <Avatar urlImg="" />
      </div>

      <div className="px-4 pt-20">
        <Card className="flex bg-primary p-2 py-4 dark:border-none">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-center font-bold text-secondary tracking-wider">A Comida Chega Rapido</h3>
            <p className="text-center font-semibold tracking-wide">Lanche delicioso com ingredientes frescos</p>
            <Button className="w-4/5 self-center bg-white font-bold text-secondary-foreground dark:text-secondary tracking-wider">COMPRAR</Button>
          </div>
          <div className="flex">
            <img className="w-[250px] self-center rounded-lg" src={burger} />
          </div>
        </Card>

        <section className="pt-10">
          <div className="flex justify-between items-center tracking-wider">
            <p className="font-bold">Categorias</p>
            <Button variant="link" className="font-bold">Ver todos</Button>
          </div>

          <div>
            {categories?.map((category, index) => {
              return (
                <div key={index}>
                  <img src={category?.img} />
                </div>)
            })}
          </div>
        </section>


        <section>
          <p>Popular do dia</p>
          <div>map de 3 produtos</div>
        </section>

      </div>
    </div>
  )
}

export default Home