import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminSideBar from "../../Components/AdminDashboardComponents/AdminSideBar";
import ProductManagement from "../../Components/AdminDashboardComponents/products/ProductManagement";
function ProductList() {
  return (
    <Layout>
        
      <div className="flex">
        <AdminSideBar />
        <ProductManagement/>
      </div>
    </Layout>
  );
}
export default ProductList;
