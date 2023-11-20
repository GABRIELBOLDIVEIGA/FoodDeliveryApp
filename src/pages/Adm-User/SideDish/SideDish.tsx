import Header from '../Header/Header';
import { useSideDishies } from './queries/useSideDishies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader2, Plus } from 'lucide-react';
import { SideDishCard } from './SideDishCard/SideDishCard';
import { Input } from 'src/components/ui/Input/Input';
import { Link } from 'react-router-dom';

const SideDish = () => {
  const { data, fetchNextPage, hasNextPage, filter, setFilter, isFetching } =
    useSideDishies();

  return (
    <section>
      <Header translateKey="SideDish.title">
        <Link to="/adm/create-new-sideDish">
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
              page.map((sideDish) => (
                <SideDishCard key={sideDish._id} {...sideDish} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </section>
    </section>
  );
};

export default SideDish;
