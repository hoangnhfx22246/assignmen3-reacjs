import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Root from "./pages/Root";
import OrderDetailPage from "./pages/OrderDetailPage";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import Authentication from "./Components/Authentication";
import OrdersPage from "./pages/OrdersPage";

//todo create router
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Authentication>
          <Root />
        </Authentication>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "shop",
          element: <ShopPage />,
        },
        {
          path: "detail/:productId",
          element: <DetailPage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: (
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          ),
        },
        {
          path: "orders/:id",
          element: (
            <PrivateRoute>
              <OrderDetailPage />
            </PrivateRoute>
          ),
        },
        {
          path: "login",
          element: (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          ),
        },
        {
          path: "register",
          element: (
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          ),
        },
      ],
    },
  ],
  { basename: "/assignmen3-reacjs/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
