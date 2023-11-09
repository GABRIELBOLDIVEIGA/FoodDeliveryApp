import { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { deliveryInstance } from 'src/services/deliveryInstance';
import {
  Product,
  productValidator,
} from 'src/validator/product/productValidator';
import { Card } from 'src/components/ui/Card/Card';
import { currencyFormat } from 'src/lib/intl/currencyFormt';
import bg_cinza from 'src/assets/bg-cinza.png';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Switch } from 'src/components/ui/Switch/Switch';

export const Products = () => {
  const { t } = useContext(LanguageContext);
  const [products, setProducts] = useState<Array<Product>>();

  useEffect(() => {
    deliveryInstance
      .get('/product')
      .then((res) => {
        const parse = productValidator.array().safeParse(res.data);
        if (parse.success) {
          setProducts(parse.data);
        } else {
          console.log(parse);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <Header translateKey={t('productsAdm.title')}>
        <Link to="/adm/create-new-product">
          <Plus />
        </Link>
      </Header>

      <section className="py-20 px-2">
        <div className="flex flex-col gap-2">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
};

type Props = {
  product: Product;
};
const Product = ({ product }: Props) => {
  const { t } = useContext(LanguageContext)
  return (
    <Link to={`/adm/product/${product._id}`}>
      <Card className="flex items-center gap-2 p-2 border-border">
        <div className="min-w-[90px] h-[90px] overflow-hidden rounded-full">
          <div className="w-[160px] h-[90px]">
            <img
              src={product.img}
              className="-translate-x-[20%] shadow-md h-full w-full"
              onError={(ev) => {
                ev.currentTarget.src = bg_cinza;
                ev.currentTarget.className =
                  'shadow-md h-full w-full animate-pulse';
              }}
            />
          </div>
        </div>

        <div className='w-full'>
          <p className="text-lg font-semibold">{product.name}</p>
          <p>
            <span className="font-semibold">{t('cardProduct.price')}</span>{' '}
            {currencyFormat(product.price)}
          </p>
          <p>
            <span className="font-semibold">{t('cardProduct.promotionalPrice')}</span>{' '}
            {currencyFormat(product.promotionalPrice)}
          </p>
          <div className='flex justify-between items-center gap-2 pb-[2px]'>
            <p className='font-semibold'>{t('cardProduct.activePromotion')}</p>
            <Switch checked={product.activePromotion} disabled />
          </div>
          <div className='flex justify-between items-center gap-2'>
            <p className="font-semibold">{t('cardProduct.avaliable')}</p>
            <Switch checked={product.avaliable} disabled />
          </div>
        </div>
      </Card>
    </Link>
  );
};
