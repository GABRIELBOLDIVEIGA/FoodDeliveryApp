import Header from '../Header/Header';
import { useQuery } from 'react-query';
import { getAllClients } from './queries/useQueries';
import { Loader } from 'lucide-react';
import { CardUser } from './CardUser/CardUser';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const Users = () => {
  const { t } = useContext(LanguageContext);
  const { data: users, isLoading } = useQuery(['getAllClients'], () =>
    getAllClients()
  );

  return (
    <section>
      <Header translateKey="Users.title" />

      <section className="flex flex-col gap-2 py-20 px-2">
        {!users && !isLoading && (
          <h1 className="self-center">{t('Users.errorMessage')}</h1>
        )}
        {isLoading && <Loader className="self-center animate-spin" />}
        {users?.map((user) => <CardUser key={user.email} {...user} />)}
      </section>
    </section>
  );
};

export default Users;
