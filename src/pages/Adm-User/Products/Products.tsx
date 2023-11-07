import { useContext, useEffect, useState } from "react"
import Header from "../Header/Header"
import { LanguageContext } from "src/context/language/LanguageContenxt"
import { deliveryInstance } from "src/services/deliveryInstance";
import { Product, productValidator } from "src/validator/product/productValidator";
import { Card } from "src/components/ui/Card/Card";
import { currencyFormat } from "src/lib/intl/currencyFormt";
import bg_cinza from "src/assets/bg-cinza.png"

export const Products = () => {
  const { t } = useContext(LanguageContext);
  const [products, setProducts] = useState<Array<Product>>()

  useEffect(() => {
    deliveryInstance.get('/product')
    .then((res) => { 
      console.log(res.data) 
      const parse = productValidator.array().safeParse(res.data);
      if(parse.success) {
        console.log(parse.data)
        setProducts(parse.data)
      } else {
        console.log(parse)
      }
    })
    .catch((err) => { console.log(err) })
  },[])

  return (
    <section >
      <Header translateKey={t('productsAdm.title')} />

      <section className="pt-20 px-2">
        <div className="flex flex-col gap-2">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
        </div>
      </section>
    </section>
  )
}

type Props = {
  product: Product
}
const Product = ({ product }: Props) => {
  return (
    <Card className="flex gap-2 p-2 border-border">
      <div className="w-[90px] h-[90px] overflow-hidden rounded-full">
        <div className="w-[160px] h-[90px] flex items-center justify-center">
          <img src={product.img} className="shadow-md h-full w-full" 
            onError={(ev) => { 
              ev.currentTarget.src = bg_cinza; 
              ev.currentTarget.className = 'shadow-md h-full w-full animate-pulse' 
            }} 
          />
        </div>
      </div>

      <div>
        <p>{product.name}</p>
        <p>Price {currencyFormat(product.price)}</p>
        <p>Promotional Price {currencyFormat(product.promotionalPrice)}</p>
        <p>Active Promotion {product.activePromotion ? 'true' : 'false'}</p>
        <p>Avaliable {product.avaliable ? 'true' : 'false'}</p>
      </div>
    </Card>
  )
}