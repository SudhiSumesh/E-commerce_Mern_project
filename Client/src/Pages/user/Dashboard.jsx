import React from "react";
import Layout from "../../Components/Layout/Layout";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import UserProfileSection from "./UserProfileSection";
import UpdateProfileModal from "../../Components/Auth/UpdateProfileModal";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex">
        <Sidebar className="min-h-[80vh] bg-[#f6f5f5be]  ">
          <Sidebar.Items className=" border rounded-sm bg-white h-[80vh]">
            <Sidebar.ItemGroup>
              <Sidebar.Item className="hover:underline rounded-none text-[blue] -ms-2 text-xl">
                <Link to={"/settings"}> Account Settings</Link>
              </Sidebar.Item>

              <Sidebar.Item
                icon={HiUser}
                className="hover:text-[blue] rounded-none"
              >
                <UpdateProfileModal />
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiShoppingBag}
                className="hover:text-[blue] rounded-none"
              >
                <Link to={"/settings/my-orders"}> My Orders</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiArrowSmRight}
                className="hover:text-[blue] rounded-none"
              >
                Delete Account
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
        <div className="w-full flex justify-center mt-20">
          <UserProfileSection />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
