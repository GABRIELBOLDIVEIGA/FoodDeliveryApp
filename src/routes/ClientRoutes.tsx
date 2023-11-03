import { Outlet } from "react-router-dom";
import NavBar from "src/components/NavBar/NavBar";

const OutletUser = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export default OutletUser