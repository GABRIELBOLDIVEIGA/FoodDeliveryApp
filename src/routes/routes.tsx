import { Route, Routes } from 'react-router-dom';
import Login from 'src/pages/login/Login';
import RequireAuth from 'src/context/auth/RequireAuth';
import PrivateRoutes from './PriviteRoutes';
import Home from 'src/pages/Client-User/Home/Home';
import { Orders as OrdersAdm } from 'src/pages/Adm-User/Orders/Orders';
import BasePage from 'src/pages/BasePage/BasePage';
import Categories from 'src/pages/Client-User/Categories/Categories';
import Products from 'src/pages/Client-User/Products/Products';
import { Products as AdmProducts } from 'src/pages/Adm-User/Products/Products';
import Cart from 'src/pages/Client-User/Cart/Cart';
import Profile from 'src/pages/Client-User/Profile/Profile';
import Orders from 'src/pages/Client-User/Orders/Orders';
import RegisterUser from 'src/pages/RegisterUser/RegisterUser';
import AdmRoutes from './AdmRoutes';
import { Categories as CategoriesAdm } from 'src/pages/Adm-User/Categories/Categories';
import UpdateCategory from 'src/pages/Adm-User/Categories/UpdateCategory/UpdateCategory';
import NewCategory from 'src/pages/Adm-User/Categories/NewCategory/NewCategory';
import UpdateProduct from 'src/pages/Adm-User/Products/UpdateProduct/UpdateProduct';
import NewProduct from 'src/pages/Adm-User/Products/NewProduct/NewProduct';
import SideDish from 'src/pages/Adm-User/SideDish/SideDish';
import Users from 'src/pages/Adm-User/Users/Users';

// export const routes = createBrowserRouter([
//   {
//     path: '/',
//     element: <BasePage />,
//     children: [
//       {
//         path: '/',
//         element: <PublicRoutes />,
//         children: [
//           {
//             path: '/login',
//             element: <Login />,
//           },
//           {
//             path: '/registerUser',
//             element: <RegisterUser />,
//           },
//         ],
//       },
//       {
//         path: '/restricted',
//         element: (
//           <RequireAuth>
//             <PrivateRoutes />
//           </RequireAuth>
//         ),
//         children: [
//           {
//             path: '/restricted/home',
//             element: <Home />,
//           },
//           {
//             path: '/restricted/categories',
//             element: <Categories />,
//           },
//           {
//             path: '/restricted/category/:id',
//             element: <Products />,
//           },
//           {
//             path: '/restricted/cart',
//             element: <Cart />,
//           },
//           {
//             path: '/restricted/profile',
//             element: <Profile />,
//           },
//           {
//             path: '/restricted/orders',
//             element: <Orders />,
//           },
//         ],
//       },

//       {
//         path: '/adm',
//         element: <AdmRoutes />,
//         children: [
//           {
//             path: '/adm/orders',
//             element: <OrdersAdm />,
//           },
//           {
//             path: '/adm/categories',
//             element: <CategoriesAdm />,
//           },
//           {
//             path: '/adm/category/:id',
//             element: <UpdateCategory />,
//           },
//           {
//             path: '/adm/create-new-category',
//             element: <NewCategory />,
//           },
//           {
//             path: '/adm/products',
//             element: <AdmProducts />,
//           },
//           {
//             path: '/adm/create-new-product',
//             element: <NewProduct />,
//           },
//           {
//             path: '/adm/product/:id',
//             element: <UpdateProduct />,
//           },
//           {
//             path: '/adm/sidedish',
//             element: <SideDish />,
//           },
//           {
//             path: '/adm/users',
//             element: <Users />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

export const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<BasePage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element={<RegisterUser />} />

        <Route
          path="/restricted"
          element={
            <RequireAuth>
              <PrivateRoutes />
            </RequireAuth>
          }
        >
          <Route path="/restricted/home" element={<Home />} />
          <Route path="/restricted/categories" element={<Categories />} />
          <Route path="/restricted/category/:id" element={<Products />} />
          <Route path="/restricted/cart" element={<Cart />} />
          <Route path="/restricted/profile" element={<Profile />} />
          <Route path="/restricted/orders" element={<Orders />} />
        </Route>

        <Route path="/adm" element={<AdmRoutes />}>
          <Route path="/adm/orders" element={<OrdersAdm />} />
          <Route path="/adm/categories" element={<CategoriesAdm />} />
          <Route path="/adm/category/:id" element={<UpdateCategory />} />
          <Route path="/adm/create-new-category" element={<NewCategory />} />
          <Route path="/adm/products" element={<AdmProducts />} />
          <Route path="/adm/create-new-product" element={<NewProduct />} />
          <Route path="/adm/product/:id" element={<UpdateProduct />} />
          <Route path="/adm/sidedish" element={<SideDish />} />
          <Route path="/adm/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};
