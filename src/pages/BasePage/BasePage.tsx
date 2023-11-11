import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

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
      <div className="relative">
        <Outlet />
      </div>
    </section>
  );
};

export default BasePage;
