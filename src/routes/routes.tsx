import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "src/pages/login/Login";
import RequireAuth from "src/context/auth/RequireAuth";
import PrivateRoutes from "./PriviteRoutes";
import Home from "src/pages/Client-User/Home/Home";
import BasePage from "src/pages/paginaBase/BasePage";
import Categories from "src/pages/Client-User/Categories/Categories";
import Products from "src/pages/Client-User/Products/Products";
import Cart from "src/pages/Client-User/Cart/Cart";
import Profile from "src/pages/Client-User/Profile/Profile";
import Orders from "src/pages/Client-User/Orders/Orders";
import RegisterUser from "src/pages/RegisterUser/RegisterUser";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    // errorElement: <>erro</>,
    children: [
      {
        path: "/",
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/registerUser",
            element: <RegisterUser />,
          },
          // {
          //   path: "/cadastro",
          //   element: <Register />,
          // },
          // {
          //   path: "/esqueciSenha",
          //   element: <ForgotPassword />,
          // },
        ],
      },
      {
        path: "/restricted",
        element: (
          <RequireAuth>
            <PrivateRoutes />
          </RequireAuth>
        ),
        children: [
          // {
          //   path: "/restricted/firstAccess",
          //   element: <FirstAccess />,
          // },
          {
            path: "/restricted/home",
            element: <Home />,
          },
          {
            path: "/restricted/categories",
            element: <Categories />,
          },
          {
            path: "/restricted/category/:id",
            element: <Products />,
          },
          {
            path: "/restricted/cart",
            element: <Cart />,
          },
          {
            path: "/restricted/profile",
            element: <Profile />,
          },
          {
            path: "/restricted/orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

export default routes;
