import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ResetPassword from "./Components/Auth/ResetPassword";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import CartPage from "./Pages/CartPage";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./Components/Routes/private";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserList from "./Pages/Admin/UserList";
import ProductList from "./Pages/Admin/ProductList";
import Category from "./Pages/Admin/Category";
import Page404 from "./Pages/Page404";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import SearchPage from "./Pages/SearchPage";
import SingleProduct from "./Pages/SingleProduct";
import { useEffect } from "react";
import UserOrders from "./Pages/user/UserOrders";
import DeleteUserAccount from "./Pages/user/DeleteUserAccount";
import DeleteUser from "./Components/AdminDashboardComponents/users/DeleteUser";
import PrintBill from "./Pages/user/PrintBill";
import Ordares from "./Pages/Admin/Ordares";
function App() {
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("logout")) {
        localStorage.removeItem("logout");
        // window.location.reload(); // Refresh
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/search" element={<SearchPage />} />

        {/* user */}
        <Route path="/settings" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="my-orders" element={<UserOrders />} />
          <Route path="delete-account" element={<DeleteUserAccount />} />
          <Route path="print-bill/:orderId" element={<PrintBill />} />
          
        </Route>
        {/* admin routes */}
        <Route path="/admin-dashboard" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="category" element={<Category />} />
          <Route path="inbox" element={<DeleteUser />} />
          <Route path="all-orders" element={<Ordares />} />
        </Route>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
export default App;
