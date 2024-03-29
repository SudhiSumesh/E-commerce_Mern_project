import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminSideBar from "../../Components/AdminDashboardComponents/AdminSideBar";
import CategoryManagement from "../../Components/AdminDashboardComponents/category/CategoryManagement";
function Category() {
  return (
    <Layout>
      <div className="flex ">
        <AdminSideBar />
        <div className="ms-10">
          <CategoryManagement />
        </div>
      </div>
    </Layout>
  );
}
export default Category;
