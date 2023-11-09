import { ChevronLeftCircle } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from 'src/components/Menu/Menu';
import { AuthContext } from 'src/context/auth/AuthContext';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { cn } from 'src/lib/utils';

interface Props {
  translateKey?: string;
  title?: string;
  children?: JSX.Element;
  type?: 'menu' | 'back';
}

const Header = ({ translateKey, title, children, type = 'menu' }: Props) => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'fixed top-0 z-20 w-screen flex justify-between items-center bg-background shadow-md p-2 dark:border-b-[1px] dark:border-secondary'
      )}
    >
      {type === 'menu' ? (
        <Menu />
      ) : (
        <ChevronLeftCircle
          onClick={() => navigate(-1)}
          className="text-primary"
        />
      )}
      <div className="text-2xl font-semibold">
        {title ? title : t(`${translateKey}`)}
      </div>
      {children && user?.role === 'adm' ? (
        children
      ) : (
        <div className="w-[35px] h-[35px]"></div>
      )}
    </div>
  );
};

export default Header;
