import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import ProductsPage from './Pages/ProductsPage';
import ResetPassword from "./Components/Auth/ResetPassword"
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import CartPage from './Pages/CartPage';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from './Components/Routes/private'
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserList from './Pages/Admin/UserList';
import ProductList from './Pages/Admin/ProductList';
import Category from './Pages/Admin/Category';
import Page404 from './Pages/Page404';
import ForgotPassword from './Components/Auth/ForgotPassword';
import SearchPage from './Pages/SearchPage';
import SingleProduct from './Pages/SingleProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<SingleProduct/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminRoute /> }>
          <Route path="" element={<AdminDashboard />} />
          <Route path="users" element={<UserList/>} />
          <Route path="products" element={<ProductList/>} />
          <Route path="category" element={<Category/>} />
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
  );};
export default App
