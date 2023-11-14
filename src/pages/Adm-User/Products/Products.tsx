import { useContext } from 'react';
import Header from '../Header/Header';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Link } from 'react-router-dom';
import { useGetAllProducts } from './queries/useQueries';
import { Loader } from 'src/components/Loader/Loader';
import { MessageError } from 'src/components/MessageError/MessageError';
import { Product } from './Product/Product';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

export const Products = () => {
  const { getAllProducts } = useGetAllProducts();
  const { t } = useContext(LanguageContext);
  const { data: products, isLoading } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: getAllProducts,
  });

  return (
    <section>
      <Header translateKey={t('productsAdm.title')}>
        <Link to="/adm/create-new-product">
          <Plus />
        </Link>
      </Header>

      <section className="py-20 px-2 bg-background">
        {!products && !isLoading && (
          <MessageError translateKey="Products.messageError" />
        )}
        {isLoading && <Loader />}
        {products && (
          <div className="flex flex-col gap-2">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};
