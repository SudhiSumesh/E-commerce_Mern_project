import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminSideBar from "../../Components/AdminDashboardComponents/AdminSideBar";
import ProductManagement from "../../Components/AdminDashboardComponents/ProductManagement";
function ProductList() {
  return (
    <Layout>
        <div>Product Page</div>
      <div className="flex">
        <AdminSideBar />
        <ProductManagement/>
      </div>
    </Layout>
  );
}
export default ProductList;
