import { useContext, useEffect, useState } from "react";
import { deliveryInstance } from "src/services/deliveryInstance";
import { Product, productSchema } from "./schemas/productSchema"
import { LanguageContext } from "src/context/language/LanguageContenxt";

const DailyDeal = () => {
  const { t } = useContext(LanguageContext)
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deliveryInstance.get('/product/product/query?page=1&limit=1')
      .then((res) => {
        const parse = productSchema.safeParse(res.data[0])
        setProduct(parse.success ? parse.data : undefined)
      })
      .catch((err) => console.log(err))
      .finally(() => { })
  }, [])

  return (
    <section className="pt-6">
      <p className="font-bold pb-4">{t('dailyDealHome.title')}</p>

      {loading &&
        <div className="w-[380px] h-[300px] animate-pulse rounded-lg bg-secondary-foreground">
        </div>
      }

      {product &&
        <div className="w-full relative">
          {!loading &&
            <div
              className="absolute right-0 bg-primary px-4 py-1 rounded-bl-lg rounded-tr-lg text-primary-foreground font-semibold">
              {t('dailyDealHome.tag')} R$ {product.price.toFixed(2)}
            </div>
          }
          <img title={product.name} src={product.img} className="w-full rounded-lg shadow-md" onLoad={() => setLoading(false)} />
        </div>
      }
    </section>
  )
}

export default DailyDeal