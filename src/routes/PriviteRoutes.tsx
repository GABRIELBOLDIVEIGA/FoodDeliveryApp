import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "src/components/Header/Header";
import NavBar from "src/components/NavBar/NavBar";
import { AuthContext } from "src/context/auth/AuthContext";

const PrivateRoutes = () => {
  const { user, singout } = useContext(AuthContext)

  switch (user?.role) {
    case "adm":
      return <div>AREA DO ADM</div>
    case "user":
      return <OutletUser />
    default:
      singout()
      return < Navigate to="/login" />
  }
};

export default PrivateRoutes;

const OutletUser = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <NavBar />
    </div>
  )
}