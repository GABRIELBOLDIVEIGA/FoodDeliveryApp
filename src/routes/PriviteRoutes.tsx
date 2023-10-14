import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const login = localStorage.getItem("access_token");

  return login ? (
    <Outlet />
  ) : (
    <div>
      <Navigate to="/login" /> Usuario nao tem premissao para acessar essa
      pagina
    </div>
  );
};

export default PrivateRoutes;