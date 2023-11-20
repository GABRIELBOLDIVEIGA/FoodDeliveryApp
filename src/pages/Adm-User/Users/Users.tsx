import Header from '../Header/Header';
import { Loader2 } from 'lucide-react';
import { CardUser } from './CardUser/CardUser';
import { useUsers } from './queries/useQueries';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input } from 'src/components/ui/Input/Input';

const Users = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, filter, setFilter } = useUsers()

  return (
    <section>
      <Header translateKey="Users.title" />

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
              page.map((user) => (
                <CardUser key={user.email} {...user} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </section>
    </section>
  );
};

export default Users;
