/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Avatar from "src/components/Avatar/Avatar"
import Menu from "src/components/Menu/Menu"
import { Button } from "src/components/ui/Button/Button"
import { Card } from "src/components/ui/Card/Card"
import burger from "src/assets/burger.jpg"
import { useEffect, useState } from "react"
import { CategoriesSchema, Category } from "./schemas/category/CategorySchema"
import { deliveryInstance } from "src/services/deliveryInstance"

const Home = () => {
  const [categories, setCategories] = useState<Array<Category>>();
  const [product, setProduct] = useState();

  useEffect(() => {
    deliveryInstance.get('/category/category/query?page=1&limit=3')
      .then((res) => {
        const categories = CategoriesSchema.safeParse(res.data);
        setCategories(categories.success ? categories.data : undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('fim...'))

    deliveryInstance.get('/product/product/query?page=1&limit=1')
      .then((res) => {
        setProduct(res.data[0])
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('fim...'))
  }, [])

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary">
        <Menu />
        <div className="text-2xl font-semibold">Home</div>
        <Avatar urlImg="" />
      </div>

      <div className="px-4 pt-24">
        <Card className="flex bg-primary p-2 py-4 dark:border-none">
          <div className="flex flex-col gap-2 w-2/3">
            <h3 className="text-xl px-2 font-bold text-secondary tracking-wider">A Comida Chega Rapido</h3>
            <p className="leading-4 font-semibold tracking-wider px-2 text-sm">Em busca de um sanduíche com carne 100% de peito de frango, temperada e empanada..</p>
            <Button className="w-4/5  bg-white font-bold text-secondary-foreground dark:text-secondary tracking-wider">COMPRAR</Button>
          </div>
          <div className="flex">
            <img className="w-[250px] self-center rounded-lg" src={burger} />
          </div>
        </Card>

        <section className="pt-6">
          <div className="flex justify-between items-center tracking-wider pb-4">
            <p className="font-bold">Categorias</p>
            <Button variant="link" className="font-bold">Ver todos</Button>
          </div>

          <div className="flex w-full gap-2 ">
            {categories?.map((category, index) => {
              return (
                <div key={index} className=" w-1/3">
                  <div className="  flex justify-center items-center rounded-md ">
                    <img src={category?.img} className="h-[60px] rounded-md shadow-md" />
                  </div>
                  <p className="text-center font-semibold pt-2">{category.name}</p>
                </div>)
            })}
          </div>
        </section>


        <section className="pt-6">
          <p className="font-bold pb-4">Popular do dia</p>
          {product &&
            <div className="w-full relative">
              <div className="absolute right-0 bg-primary px-4 py-1 rounded-bl-lg rounded-tr-lg text-primary-foreground font-semibold">15% de desconto</div>
              <img src={product.img} className="w-full rounded-lg shadow-md" />
            </div>
          }
        </section>

      </div>
    </div>
  )
}

export default Home