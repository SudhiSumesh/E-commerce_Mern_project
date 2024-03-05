import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminSideBar from "../AdminSideBar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../Context/auth";
function DeleteUser() {
  const [deleteRequests, setDeleteRequests] = useState([]);
  const [status,setStatus]=useState(false)//to trigger re-render
  useEffect(() => {
    getRequests();
  }, [status]);
  //get all delete requests
  const getRequests = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_GET_ALL_DELETE_REQUESTS_URL,
        );
      if (data.success) {
        setDeleteRequests(data.deleteRequests);
        // console.log(deleteRequests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting requests");
    }
  };
  //   Approve delete requests
  const approveRequest = async (reqId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APPROVE_DELETE_REQUESTS_URL}/${reqId}`,
        
      );
      if (data.success) {
        toast.success(data.message);
        setStatus(!status);

      }
    } catch (error) {
      console.log(error);
      toast.error("error in reject request");
    }
  };
  //reject requests
  const rejectRequest = async (reqId) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_REJECT_DELETE_REQUESTS_URL}/${reqId}`
      );
      if (data.success) {
        toast.success(data.message);
        setStatus(!status)
      }
    } catch (error) {
      console.log(error);
      toast.error("error in reject request");
    }
  };
  return (
    <Layout>
      <div className="flex">
        <AdminSideBar />
        <div className="m-4 w-1/2 px-10">
          <h1 className="text-4xl  my-4  ">Delete Requests</h1>
          {deleteRequests?.length ===0?<div className="text-xl text-[orange]">No new requests</div>:
          deleteRequests?.map((req, index) => (
            <div
              className="flex justify-between border shadow-md p-4 rounded-md"
              key={index}
            >
              <div>
                <div className="text-lg">{`${req.name} is requested to delete their account`}</div>
                <div className="text-lg my-3">
                  Reason :<span>{req?.deleteRequest?.reason}</span>
                </div>
                <div className="text-lg">
                  Email :<span className="text-[blue]"> {req.email}</span>
                 
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => approveRequest(req._id)}
                  className="brder font-bold bg-[#ecc2c254]  hover:bg-[#3ddb3d5e] p-3 rounded-md text-[#33f92d]"
                >
                  Approve & Delete
                </button>
                <button
                  onClick={()=>rejectRequest(req._id)}
                  className="p-3 rounded-md text-[#f78181] bg-[#53db5349] font-bold px-10 hover:text-green-400  hover:bg-[#b8646470]"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default DeleteUser;
