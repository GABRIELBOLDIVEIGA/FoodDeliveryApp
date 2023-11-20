import { useContext } from 'react';
import Header from '../Header/Header';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Link } from 'react-router-dom';
import { useProducts } from './queries/useQueries';
import { Product } from './Product/Product';
import { Loader2, Plus } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input } from 'src/components/ui/Input/Input';

export const Products = () => {
  const { t } = useContext(LanguageContext);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    filter,
    setFilter,
  } = useProducts();

  return (
    <section>
      <Header translateKey={t('productsAdm.title')}>
        <Link to="/adm/create-new-product">
          <Plus />
        </Link>
      </Header>

      <section className="py-16 px-2 bg-background">
        <Input
          className="mb-4"
          placeholder="search..."
          value={filter}
          onChange={(ev) => setFilter(ev.target.value)}
        />

        <InfiniteScroll
          dataLength={data?.pages.length ?? 0}
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={
            isFetching && (
              <div className="w-full flex justify-center pt-4 pb-20">
                <Loader2 className="animate-spin" />
              </div>
            )
          }
        >
          <div className="flex flex-col gap-2">
            {data?.pages.map((page) =>
              page.map((product) => (
                <Product key={product._id} product={product} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </section>
    </section>
  );
};
