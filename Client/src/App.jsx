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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="users" element={<UserList/>} />
          <Route path="products" element={<AdminDashboard />} />
          <Route path="category" element={<AdminDashboard />} />
        </Route>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );};
export default App
