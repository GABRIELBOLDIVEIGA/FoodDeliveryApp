import { Button } from 'src/components/ui/Button/Button';
import { Card } from 'src/components/ui/Card/Card';
import { Input } from 'src/components/ui/Input/Input';
import { Label } from 'src/components/ui/Label/Label';
import useLogin from './form/useLogin';
import { useContext, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AuthContext } from 'src/context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'src/components/ui/AlertDialog/AlertDialog';
import Configs from 'src/components/Configs/Configs';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const Login = () => {
  const { t } = useContext(LanguageContext);
  const { handleSubmit, handleLogin, register, loading, error, errors } =
    useLogin();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (error) setAlert(true);
  }, [error]);

  useEffect(() => {
    switch (user?.role) {
      case 'adm':
        navigate('/adm/orders');
        break;
      case 'user':
        navigate('/restricted/home');
        break;
      default:
        navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="h-full w-full px-4 flex flex-col ">
      <div className="border-[10px] border-primary rounded-full w-[100px] h-[100px] fixed self-end translate-x-12 -translate-y-7"></div>

      <div className="pt-2">
        <Configs />
      </div>

      <h1 className="font-bold text-center text-2xl py-10 text-primary">
        {t('login.welcome')}
      </h1>

      <Card className="bg-background p-4 border-border">
        <p className="text-center text-lg font-semibold">{t('login.header')}</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <Label className="font-semibold">{t('login.email')}</Label>
            <Input
              placeholder={t('login.emailPlaceholder')}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Label className="font-semibold">{t('login.password')}</Label>
            <Input
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full font-semibold mt-6 gap-2 tracking-wider"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
            {loading && <div className="ml-2 h-4 w-4 "></div>}
          </Button>
        </form>
      </Card>

      <div className="flex justify-between pt-10">
        <Button
          className="font-semibold tracking-wider"
          onClick={() => navigate('/registerUser')}
        >
          {t('login.singup')}
        </Button>
        <Button variant="link">{t('login.forgot')}</Button>
      </div>

      <Card className="bg-background p-4 mt-10 border-border">
        <h2 className=" font-bold text-center text-xl">{t('login.mock')}</h2>

        <div className="border-b-2 border-border pt-4">
          <h3 className="text-lg  font-bold">{t('login.adm')}</h3>
          <p>E-mail: adm@email.com</p>
          <p>{t('login.password')}: 123456</p>
        </div>

        <div className="border-b-2 border-border pt-4">
          <h3 className="text-lg font-bold">{t('login.client')}</h3>
          <p>Email: cliente@email.com</p>
          <p>{t('login.password')}: 123456</p>
        </div>
      </Card>

      <AlertDialog open={alert}>
        <AlertDialogContent className="w-[95%]">
          <AlertDialogHeader>
            <AlertDialogTitle>{error?.message}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlert(!alert)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Login;
