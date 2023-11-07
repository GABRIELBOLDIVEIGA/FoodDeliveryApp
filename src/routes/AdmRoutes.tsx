import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from 'src/components/NavBar/NavBar';
import { AuthContext } from 'src/context/auth/AuthContext';

const AdmRoutes = () => {
  const { user, singout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'adm') {
      navigate('/login');
    }
  }, [navigate, singout, user?.role]);

  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export default AdmRoutes;
