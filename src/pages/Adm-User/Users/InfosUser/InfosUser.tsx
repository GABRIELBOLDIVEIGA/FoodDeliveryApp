import { Card } from 'src/components/ui/Card/Card';
import Header from '../../Header/Header';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserInfos } from './queries/useQueries';
import { Loader } from 'lucide-react';
import { Separator } from 'src/components/Separator/Separator';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const InfosUser = () => {
  const { t } = useContext(LanguageContext)
  const params = useParams<{ id: string }>();
  const { data: user, isLoading } = useQuery(['getUserInfos', params], () =>
    getUserInfos(params.id ?? '')
  );

  return (
    <section className="bg-background">
      <Header translateKey="InfosUser.title" type="back" />

      <section className="py-20 px-2">
        {!user && !isLoading && (
          <h1 className="text-center">{t('InfosUser.errorMessage')}</h1>
        )}

        {isLoading && (
          <div className="flex justify-center">
            <Loader className="text-center animate-spin" />
          </div>
        )}

        {user && (
          <Card className="dark:border-border p-2">
            <Separator className="pb-2 pt-0" translateKey="InfosUser.infos" />

            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.name')}: </span>
              {user.name}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.email')}: </span>
              {user.email}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.phoneNumber')}: </span>
              {user.phoneNumber}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.document')}: </span>
              {user.document}
            </p>

            <Separator translateKey="InfosUser.address" className="py-2" />

            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.zipCode')}: </span>
              {user.zipCode}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.city')}: </span>
              {user.city}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.neighborhood')}: </span>
              {user.neighborhood}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.street')}: </span>
              {user.street}
            </p>
            <p className="flex justify-between">
              <span className="font-bold">{t('InfosUser.number')}: </span>
              {user.number}
            </p>
          </Card>
        )}
      </section>
    </section>
  );
};

export default InfosUser;
