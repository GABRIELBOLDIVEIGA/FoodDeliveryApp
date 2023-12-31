import { useContext, useState } from 'react';
import { Card } from 'src/components/ui/Card/Card';
import burger from 'src/assets/burger.jpg';
import { cn } from 'src/lib/utils';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const Banner = () => {
  const { t } = useContext(LanguageContext);
  const [imgLoading, setImgLoadin] = useState(true);

  return (
    <Card className="flex bg-primary p-2 py-4 dark:border-none">
      <div className="flex flex-col gap-2 w-2/3">
        <h3 className="text-xl px-2 font-bold  tracking-wider">
          {t('bannerHome.title')}
        </h3>
        <p className="leading-4 font-semibold text-secondary tracking-wider px-2 text-sm">
          {t('bannerHome.subTitle')}
        </p>
      </div>

      <div className="flex">
        <div
          className={cn(
            'animate-pulse self-center rounded-lg bg-secondary-foreground h-[150px] w-[185px]',
            `${imgLoading ? '' : 'sr-only'}`
          )}
        ></div>
        <img
          className={cn(
            'w-[250px] self-center rounded-lg',
            `${imgLoading ? 'sr-only' : ''}`
          )}
          src={burger}
          onLoad={() => setImgLoadin(false)}
        />
      </div>
    </Card>
  );
};

export default Banner;
