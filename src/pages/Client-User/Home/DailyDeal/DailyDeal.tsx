import { useContext, useEffect, useState } from 'react';
import { useDeliveryInstance } from 'src/services/deliveryInstance';
import {
  Product,
  productValidator,
} from 'src/validator/product/productValidator';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import imgError from 'src/assets/404FullHD.jpg';

const DailyDeal = () => {
  const { deliveryInstance } = useDeliveryInstance()
  const { t } = useContext(LanguageContext);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deliveryInstance
      .get('/product')
      .then((res) => {
        const parse = productValidator.safeParse(res.data[0]);
        setProduct(parse.success ? parse.data : undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pt-6">
      <p className="font-bold pb-4">{t('dailyDealHome.title')}</p>

      {loading && (
        <div className="w-[360px] h-[200px] animate-pulse rounded-lg bg-secondary-foreground"></div>
      )}

      {product && (
        <div className="w-full relative">
          {!loading && (
            <div className="absolute right-0 bg-primary px-4 py-1 rounded-bl-lg rounded-tr-lg text-primary-foreground font-semibold">
              {t('dailyDealHome.tag')} R$ {product.price.toFixed(2)}
            </div>
          )}

          <img
            title={product.name}
            src={product.img}
            className="w-full rounded-lg shadow-md"
            onError={(ev) => (ev.currentTarget.src = imgError)}
            onLoad={() => setLoading(false)}
          />
        </div>
      )}
    </section>
  );
};

export default DailyDeal;
