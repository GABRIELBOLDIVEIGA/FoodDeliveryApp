import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { cn } from 'src/lib/utils';

type Props = {
  text?: string;
  className?: string;
  translateKey?: string;
};

export const Separator = ({ text, className, translateKey }: Props) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className={cn('flex items-center gap-2 pt-6', className)}>
      <div className="border-b border-border w-full" />
      <p className="min-w-max">{translateKey ? t(`${translateKey}`) : text}</p>
      <div className="border-b border-border w-full" />
    </div>
  );
};
