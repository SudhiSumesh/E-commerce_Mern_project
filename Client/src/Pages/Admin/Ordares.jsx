import React from 'react'
import Layout from '../../Components/Layout/Layout';
import AdminSideBar from '../../Components/AdminDashboardComponents/AdminSideBar';
import AllOrders from '../../Components/AdminDashboardComponents/orders/AllOrders';

function Ordares() {
  return (
    <Layout>
      <div className="flex ">
        <AdminSideBar />
        
        <div className="">
    <AllOrders/>
        </div>
      </div>
    </Layout>
  );
}

export default Ordares
