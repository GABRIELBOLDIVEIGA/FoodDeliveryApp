import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "src/context/auth/AuthContext";
import AdmRoutes from "./AdmRoutes";
import ClientRoutes from "./ClientRoutes";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  switch (user?.role) {
    case "adm":
      return <AdmRoutes />;
    case "user":
      return <ClientRoutes />;
    default:
      // singout();
      return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;


