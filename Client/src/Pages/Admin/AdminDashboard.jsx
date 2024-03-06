import Layout from "../../Components/Layout/Layout";
import AdminSideBar from "../../Components/AdminDashboardComponents/AdminSideBar";
import UserCountComponent from "../../Components/AdminDashboardComponents/UserCountComponent";
import TotelOrders from "../../Components/AdminDashboardComponents/TotelOrders";
import DashboardChart from "../../Components/AdminDashboardComponents/DashboardChart";
import SalesBarChart from "../../Components/AdminDashboardComponents/SalesBarChart";
import AllOrdersTable from "../../Components/AdminDashboardComponents/AllOrdersTable";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="flex ">
        <AdminSideBar />
        <AllOrdersTable />
        <div className="flex   flex-col  w-full my-4    items-end ">
          <div className="flex flex-col border-s-2   ">
            <div className="flex flex-col container ">
              <UserCountComponent />
              <TotelOrders />
              <div className="">
                <SalesBarChart />
              </div>
            </div>
            {/* 
            <div>
              <DashboardChart />
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
