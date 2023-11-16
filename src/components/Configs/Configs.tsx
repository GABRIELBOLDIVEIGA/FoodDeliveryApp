import ToggleTheme from '../ToggleTheme/ToggleTheme';
import ToggleLanguage from '../ToggleLanguage/ToggleLanguage';
import { cn } from 'src/lib/utils';

type ConfigsProps = {
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Configs = ({ className }: ConfigsProps, rest: any) => {
  return (
    <div {...rest} className={cn('flex flex-row gap-2 self-end', className)}>
      <ToggleTheme />
      <ToggleLanguage />
    </div>
  );
};

export default Configs;
