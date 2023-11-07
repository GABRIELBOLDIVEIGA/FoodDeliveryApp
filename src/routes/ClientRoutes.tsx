import { Outlet } from 'react-router-dom';
import NavBar from 'src/components/NavBar/NavBar';

const ClientRoutes = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export default ClientRoutes;
