import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import ProductsPage from './Pages/ProductsPage';
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
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
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );};
export default App
