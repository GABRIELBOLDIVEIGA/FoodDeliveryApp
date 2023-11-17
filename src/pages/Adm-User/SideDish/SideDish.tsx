import Header from '../Header/Header';
import { useSideDishies } from './queries/useSideDishies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader2 } from 'lucide-react';
import { SideDishCard } from './SideDishCard/SideDishCard';

const SideDish = () => {
  const { data, fetchNextPage, hasNextPage } = useSideDishies();

  return (
    <section>
      <Header translateKey="SideDish.title" />

      <section className="py-20 px-2 bg-background">
        <InfiniteScroll
          dataLength={data?.pages.length ?? 0}
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={<div className='w-full flex justify-center pt-4 pb-20'><Loader2 className='animate-spin'/></div>}
          endMessage={<p className="text-center">Yay! You have seen it all</p>}
        >
          <div className='flex flex-col gap-2'>
          {data?.pages.map((page) => ( page.map((sideDish) => <SideDishCard {...sideDish}/>)))}
          </div>
        </InfiniteScroll>
      </section>
    </section>
  );
};

export default SideDish;


