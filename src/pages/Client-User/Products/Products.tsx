import { ChevronLeftCircle, Loader } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Product,
  productsSchema,
} from 'src/validator/product/productValidator';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import CardProduct from 'src/components/CardProduct/CardProduct';
import { useDeliveryInstance } from 'src/services/deliveryInstance';

const Products = () => {
  const { deliveryInstance } = useDeliveryInstance()
  const params = useParams<{ id: string }>();
  const [products, setProducts] = useState<Array<Product>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deliveryInstance
      .get(`/product/productsByCategory/${params.id}`)
      .then((res) => {
        const parse = productsSchema.safeParse(res.data);
        setProducts(parse.success ? parse.data : undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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
  );
};

export default Products;

const Header = () => {
  const { t } = useContext(LanguageContext);
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
