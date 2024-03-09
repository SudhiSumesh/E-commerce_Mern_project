import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminSideBar from "../../Components/AdminDashboardComponents/AdminSideBar";
import UserManagement from "../../Components/AdminDashboardComponents/users/UserManagement";
function UserList() {
  return (
    <Layout>
      <div className="flex">
        <AdminSideBar />
        <UserManagement />
      </div>
    </Layout>
  );
}
export default UserList;
