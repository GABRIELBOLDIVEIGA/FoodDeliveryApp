import { Check } from 'lucide-react';
import { useContext } from 'react';
import { Card } from 'src/components/ui/Card/Card';
import { AuthContext } from 'src/context/auth/AuthContext';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const CardAddress = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  return (
    <Card className="bg-muted p-4 mx-2 mt-6 border-border ">
      <h1 className="text-center font-bold">{t('cart.deliveryAddress')}</h1>
      <div className="flex justify-between items-center gap-2">
        <div>
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p>
            {t('cart.street')} {user?.street}
          </p>
          <p>
            {t('cart.neighborhood')} {user?.neighborhood}
          </p>
          <p>
            {t('cart.number')} {user?.number}
          </p>
          <p>
            {t('cart.phoneNumber')} {user?.phoneNumber}
          </p>
        </div>
        <div className="bg-primary text-secondary shadow-md rounded-full p-2">
          <Check />
        </div>
      </div>
    </Card>
  );
};

export default CardAddress;
