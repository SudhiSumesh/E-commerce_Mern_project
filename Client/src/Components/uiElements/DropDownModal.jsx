import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import {  Toaster, toast } from "react-hot-toast";

function DropDownModal() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const notifySuccess = () => toast.success("logout succssfully");

  //handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear("auth");
    
    notifySuccess();
    navigate("/");
    // console.log(auth);
  };
  return (
    <div className="mt-1 mx-3 ">
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt="User profile" img={auth?.user?.avatar} rounded />}
      >
        <Dropdown.Header>
          <span className="block text-xl capitalize font-medium">
            {auth?.user?.name}
          </span>
          <span className="block text-sm font-medium truncate">
            {auth?.user?.email}
          </span>
        </Dropdown.Header>
        {auth?.user?.role === 1 && (
          <Dropdown.Item className="hover:text-[blue]">
            <Link to={"/admin-dashboard"}>Dashboard</Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item className="hover:text-[blue]">
          <Link to={"/settings"}>Settings</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} className="hover:text-[blue]">
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Toaster />
    </div>
  );
}

export default DropDownModal;
