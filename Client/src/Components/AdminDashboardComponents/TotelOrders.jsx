import axios from "axios";
import React, { useEffect, useState } from "react";

function UserCountComponent( ) {
  const [totelOrders, setTotelOrders] = useState();

  //get all user count
  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {
    try {
     const response = await axios.get(import.meta.env.VITE_GET_ALL_ORDERS_URL);
     const orders = response.data.orders;
     setTotelOrders(orders.length)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-3 me-40">
      <div className=" bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-8 px-10">
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <div className="rounded-full px-4 py-4 bg-indigo-600 text-[white]">
              <p className="font-bold text-3xl">{totelOrders}</p>
            </div>
          </div>
          <div className="flex-1 text-right md:text-center">
            <h2 className="font-bold uppercase text-gray-600">Total Orders</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCountComponent;
