import axios from "axios";
import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

function AdminSideBar() {
  const [deleteRequests, setDeleteRequests] = useState([]);

  // get inbox req
  useEffect(() => {
    getRequests();
  }, []);
  //get all delete requests
  const getRequests = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_GET_ALL_DELETE_REQUESTS_URL
      );
      if (data.success) {
        setDeleteRequests(data.deleteRequests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting requests");
    }
  };
  return (
    <Sidebar className="min-h-[80vh] bg-[#f6f5f5be]  ">
      <Sidebar.Items className=" border px-4 rounded-sm bg-white h-[80vh]">
        <Sidebar.ItemGroup>
          <Sidebar.Item className="hover:underline rounded-none text-[blue] -ms-2 text-xl">
            <Link to={"/admin-dashboard"}> Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiInbox}
            className="hover:text-[blue] rounded-none"
          >
            <Link to={"/admin-dashboard/inbox"}> Inbox</Link>
            <div className=" inline-flex  justify-center w-6 h-6 text-sm font-bold text-white bg-red-500 border-2 border-white rounded-full    dark:border-gray-900">
              {deleteRequests?.length}
            </div>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiUser}
            className="hover:text-[blue] rounded-none"
          >
            <Link to="/admin-dashboard/users"> Users</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiShoppingBag}
            className="hover:text-[blue] rounded-none"
          >
            <Link to={"/admin-dashboard/products"}> Products</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiViewBoards}
            className="hover:text-[blue] rounded-none"
          >
            <Link to={"/admin-dashboard/category"}> Category</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiTable}
            className="hover:text-[blue] rounded-none"
          >
            <Link to={"/admin-dashboard/all-orders"}>Orders</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiChartPie}
            className="hover:text-[blue] rounded-none"
          >
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiViewBoards}
            className="hover:text-[blue] rounded-none"
          >
            Documentation
          </Sidebar.Item>
          <Sidebar.Item
            icon={BiBuoy}
            className="hover:text-[blue] rounded-none"
          >
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default AdminSideBar;
