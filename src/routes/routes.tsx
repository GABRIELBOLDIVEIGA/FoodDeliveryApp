import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "src/pages/login/Login";
import RequireAuth from "src/context/auth/RequireAuth";
import PrivateRoutes from "./PriviteRoutes";
import Home from "src/pages/home/Home";
import BasePage from "src/pages/paginaBase/BasePage";
import Categories from "src/pages/Categories/Categories";
import Products from "src/pages/Products/Products";
import Cart from "src/pages/Cart/Cart";
import Profile from "src/pages/Profile/Profile";
import Orders from "src/pages/Orders/Orders";

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
