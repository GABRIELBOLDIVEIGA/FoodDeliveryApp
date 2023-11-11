import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'src/components/ui/Card/Card';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Profile } from 'src/validator/perfil/perfilValidator';

export const CardUser = (user: Profile) => {
  const { t } = useContext(LanguageContext);

  return (
    <Link to={`/adm/user/${user._id}`}>
      <Card className="p-2 border border-border">
        <p>
          <span className="font-bold">{t('CardUserAdm.name')}: </span>
          {user.name.toUpperCase()}
        </p>
        <p>
          <span className="font-bold">{t('CardUserAdm.email')}: </span>
          {user.email.toLowerCase()}
        </p>
        <p>
          <span className="font-bold">{t('CardUserAdm.phone')}: </span>
          {user.phoneNumber}
        </p>
      </Card>
    </Link>
  );
};
