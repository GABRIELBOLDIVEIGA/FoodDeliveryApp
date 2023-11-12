import { Product as ProductType } from 'src/validator/product/productValidator';
import { Card } from 'src/components/ui/Card/Card';
import { currencyFormat } from 'src/lib/intl/currencyFormt';
import bg_cinza from 'src/assets/bg-cinza.png';
import { Switch } from 'src/components/ui/Switch/Switch';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Link } from 'react-router-dom';

type Props = {
  product: ProductType;
};
export const Product = ({ product }: Props) => {
  const { t } = useContext(LanguageContext);
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

        <div className="w-full">
          <p className="text-lg font-semibold">{product.name}</p>
          <p>
            <span className="font-semibold">{t('cardProduct.price')}</span>{' '}
            {currencyFormat(product.price)}
          </p>
          <p>
            <span className="font-semibold">
              {t('cardProduct.promotionalPrice')}
            </span>{' '}
            {currencyFormat(product.promotionalPrice)}
          </p>
          <div className="flex justify-between items-center gap-2 pb-[2px]">
            <p className="font-semibold">{t('cardProduct.activePromotion')}</p>
            <Switch checked={product.activePromotion} disabled />
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="font-semibold">{t('cardProduct.avaliable')}</p>
            <Switch checked={product.avaliable} disabled />
          </div>
        </div>
      </Card>
    </Link>
  );
};
