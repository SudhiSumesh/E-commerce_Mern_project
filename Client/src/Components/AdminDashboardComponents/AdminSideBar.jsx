
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

function AdminSideBar() {
  return (
    <Sidebar className="min-h-[80vh] bg-[#f6f5f5be]  ">
      <Sidebar.Items className=" border rounded-sm bg-white h-[80vh]">
        <Sidebar.ItemGroup>
          <Sidebar.Item className="hover:underline rounded-none text-[blue] -ms-2 text-xl">
            <Link to={"/admin-dashboard"}> Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiInbox}
            className="hover:text-[blue] rounded-none"
          >
            <Link> Inbox</Link>
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
            <Link> Products</Link>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiViewBoards}
            className="hover:text-[blue] rounded-none"
          >
            <Link> Category</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="hover:text-[blue] rounded-none"
          >
            Sign In
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiTable}
            className="hover:text-[blue] rounded-none"
          >
            Sign Up
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
            href="#"
            icon={HiViewBoards}
            className="hover:text-[blue] rounded-none"
          >
            Documentation
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
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
