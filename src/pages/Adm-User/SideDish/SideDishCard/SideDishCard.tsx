import { SideDish as SideDishType } from 'src/validator/sideDish/sideDishValidator';
import { cn } from 'src/lib/utils';
import { Card } from 'src/components/ui/Card/Card';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { currencyFormat } from 'src/lib/intl/currencyFormt';
import { Switch } from 'src/components/ui/Switch/Switch';
import { Link } from 'react-router-dom';

type SideDishProps = {
  className?: string;
} & SideDishType;

export const SideDishCard = ({
  _id,
  avaliable,
  description,
  name,
  price,
  className,
}: SideDishProps) => {
  const { t } = useContext(LanguageContext);
  return (
    <Link to={`${_id}`}>
      <Card className={cn('border-border p-2', className)} id={_id}>
        <p>
          <span className="font-bold">{t('SideDishCard.name')}: </span>
          {name}
        </p>
        <p>
          <span className="font-bold">{t('SideDishCard.description')}: </span>
          {description}
        </p>
        <p>
          <span className="font-bold">{t('SideDishCard.price')}: </span>
          {currencyFormat(price)}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">{t('SideDishCard.avaliable')}: </span>
          <Switch checked={avaliable} disabled />
        </p>
      </Card>
    </Link>
  );
};
