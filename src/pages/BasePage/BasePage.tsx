import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'src/components/ui/Card/Card';

const BasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-screen h-screen relative bg-background text-secondary-foreground tracking-wide">
      <div className="sm:hidden md:visible py-10 px-4">
        <Card className="flex flex-col justify-center gap-2 text-center p-2 border-border">
          <p>A versão desktop dessa aplicação esta em desenvolvimento.</p>
          <p>Reduza a tela para uma melhor experiencia.</p>
        </Card>
      </div>

      <div className="relative md:hidden">
        <Outlet />
      </div>
    </section>
  );
};

export default BasePage;
