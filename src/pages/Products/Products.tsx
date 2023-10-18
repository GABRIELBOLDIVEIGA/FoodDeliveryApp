import { ChevronLeftCircle, Loader, Minus, Plus } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deliveryInstance } from "src/services/deliveryInstance"
import { Product, productsSchema } from "src/validator/productSchema"
import _404_img from "src/assets/404FullHD.jpg"
import { Button } from "src/components/ui/Button/Button"
import { cn } from './../../lib/utils';
import { LanguageContext } from "src/context/language/LanguageContenxt"

const Products = () => {
  const params = useParams<{ id: string }>()
  const [products, setProducts] = useState<Array<Product>>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    deliveryInstance.get(`/product/productsByCategory/${params.id}`)
      .then((res) => {
        console.log(res.data)
        const parse = productsSchema.safeParse(res.data)
        setProducts(parse.success ? parse.data : undefined)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [params])


  return (
    <section>
      <Header />

      <div className="flex flex-col gap-2 pt-16 px-2">
        {loading && <Loader className="self-center animate-spin" />}
        {products?.map((product) => (
          <CardProduct key={product._id} {...product} />
        ))}
      </div>

    </section>
  )
}

export default Products

const Header = () => {
  const { t } = useContext(LanguageContext)
  return (
    <div className="fixed top-0 z-10 flex justify-between bg-background w-full shadow-md px-4 py-3">
      <Link to="/restricted/categories">
        <ChevronLeftCircle className="text-primary" />
      </Link>
      <h3 className="font-bold tracking-wider">{t('productsAdd.title')}</h3>
      <div className="w-[24px]"></div>
    </div>
  );
};


const CardProduct = (product: Product) => {

  return (
    <div className="flex gap-2 rounded-xl p-2 shadow-md bg-primary">

      <div className={cn(`flex w-[190px] h-[120px] rounded-xl bg-muted`)}>
        <img
          className={cn(`rounded-xl w-full h-full`)}
          onError={(ev) => ev.currentTarget.src = _404_img}
          src={product.img}
        />
      </div>

      <div className="flex flex-col justify-between w-1/2">
        <div>
          <h3 className="text-secondary dark:text-secondary-foreground font-bold tracking-wider">{product.name}</h3>
          <p className="dark:text-secondary text-sm font-semibold">{product.description}</p>
        </div>

        <div className="w-full flex justify-between items-center rounded-md bg-muted">
          <Button size="icon" className="bg-transparent text-secondary-foreground"><Minus /></Button>
          <p className=" font-semibold">32</p>
          <Button size="icon" className="bg-transparent text-secondary-foreground"><Plus /></Button>
        </div>
      </div>

    </div>
  )
}