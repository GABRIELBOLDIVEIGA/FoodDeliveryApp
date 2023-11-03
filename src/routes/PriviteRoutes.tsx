import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "src/context/auth/AuthContext";
import AdmRoutes from "./AdmRoutes";
import OutletUser from "./ClientRoutes";

const PrivateRoutes = () => {
  const { user, singout } = useContext(AuthContext);

  switch (user?.role) {
    case "adm":
      return <AdmRoutes />;
    case "user":
      return <OutletUser />;
    default:
      singout();
      return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;


