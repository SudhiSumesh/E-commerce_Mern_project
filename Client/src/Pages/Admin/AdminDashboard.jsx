import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminSideBar from '../../Components/AdminDashboardComponents/AdminSideBar'

const AdminDashboard = () => {
  return (
    <Layout>
      <div className='flex'>
        <AdminSideBar />
        <div className="flex flex-col my-10 items-center mx-auto ">
          <h1 className='text-5xl'>Salalah</h1>
          <h3> Contoll Your Business Here</h3>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard
