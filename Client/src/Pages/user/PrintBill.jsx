import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import {useReactToPrint} from "react-to-print"

function PrintBill() {
    
  // Access the orderId from the URL params
  const { orderId } = useParams();
  const [auth]= useAuth()
  const [order, setOrder] = useState([]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_GET_SINGLE_ORDER_URL}/${orderId}`
        ); // Assuming the endpoint to fetch order details is `/api/orders/:orderId`
        if (data.success) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);
  return (
    <div className=" p-10 container">
      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          className=" border-2  bg-[gray] p-2 px-6 rounded-md text-white "
        >
          Print this out !
        </button>
      </div>{" "}
      <div
        ref={componentRef}
        className="w-1/2 mt-20 mx-auto p-10 border  bg-white border-[black] rounded-md "
      >
        <div className="flex justify-between  mb-6">
          <div>
            <span className="text-3xl underline">Salalah.</span>
          </div>
          <div className="">
            <p className="text-sm">Invoice No: #m57r5692</p>
            <p className="text-sm">Date: 05.01.2022</p>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Customer Info:</h3>
          <p>Name: {auth.user.name}</p>
          <p>Email: {auth.user.email}</p>
          <p>Phone: +91 {auth.user.phone}</p>
        </div>
        {/* Details Table */}
        <table className="w-full text-left mb-6 border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Sl No</th>
              <th className="py-2 px-4">Product Name</th>

              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Add table rows here */}
            {/* Example */}
            {order?.orderList?.map((item) => (
              <tr>
                <td className="py-2 px-4">A1</td>
                <td className="py-2 px-4">{item.product?.name}</td>

                <td className="py-2 px-4"> {item.quantity}</td>
                <td className="py-2 px-4">{item.product?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Payment Info */}
        <h3 className="text-lg font-bold mb-2">Payment Info:</h3>
        <p>Total: ₹ {order?.payment?.amount}</p>
        <p className="mt-1">Payment Id: {order?.payment?._id} </p>
      </div>
    </div>
  );
}

export default PrintBill;
