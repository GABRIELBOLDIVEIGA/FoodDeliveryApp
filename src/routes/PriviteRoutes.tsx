import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "src/context/auth/AuthContext";

const PrivateRoutes = () => {
  const { user, singout } = useContext(AuthContext)

  switch (user?.role) {
    case "adm":
      return <div>AREA DO ADM</div>
    case "user":
      return <Outlet />
    default:
      singout()
      return < Navigate to="/login" />
  }
};

export default PrivateRoutes;