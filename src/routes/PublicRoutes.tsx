import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  return (
    <>
      <Navigate to="/login" />
      <Outlet />
    </>
  );
};

export default PublicRoutes;
