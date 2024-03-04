import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
function MyOders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    getOrders();
  }, [auth]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_GET_ORDERS_URL);
      if (data.success) {
        setOrders(data.orders);
        console.log(orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-10">
      {orders
        ?.slice(0)
        .reverse()
        .map((order) => (
          <>
            <div
              key={order._id}
              className="p-6 mx-auto bg-white rounded-xl shadow-sm border  flex flex-col justify-between gap-10 w-full my-6"
            >
              <p className="text-[] "> Order ID : {order._id}</p>

              {order?.orderList?.map((item) => (
                <>
                  <div
                    className=" flex justify-between md:flex-row flex-col"
                    key={item._id}
                  >
                    <div className="">
                      <img
                        crossOrigin=""
                        className="h-32 w-32"
                        src={`http://localhost:4000/images/${item.product.imageOne}`}
                        alt={item.product.name}
                      />
                    </div>
                    <div className="text-start  min-w-[150px]">
                      <div className="text-xl font-medium text-black">
                        {item.product.name}
                      </div>
                      <p className="text-green-500 text-lg mt-3">
                        $ {item.product.price} .00
                      </p>
                      <div>Quantity : {item.quantity}</div>
                      {/* <div>
                    Total Price : $ {item.product.price * item.quantity} .00
                  </div> */}
                    </div>

                    <div>
                      <h4 className="text-xl font-medium text-black">
                        Delivery address
                      </h4>
                      <div className=" mt-3 bg-gray-300 rounded-md p-1">
                        ship to :{auth.user.name}
                      </div>
                      <address>{auth.user.address}</address>
                      <p>{auth.user.phone}</p>
                    </div>
                    {/* Shipping Status */}
                    {/* This can be made dynamic based on the actual order status */}
                    {/* Each step can have different styling based on whether it is completed or not */}

                    {/* The date can also be dynamic */}
                  </div>
                </>
              ))}
              <div className="text-end border-t-2 pt-1 font-bold">
                <h4 className="text-xl font-medium text-black ">
                  Totel Amount 
                </h4>
                {/* <div className=" ">ship to</div> */}

                {/* <button className="bg-red-400 text-white p-2 rounded-md mt-2">
                  Cancel order
                </button> */}

                
                  <span className="text-[green] text-2xl font-semibold">
                    
                    ${order?.payment?.amount}.00
                  </span>
                
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

export default MyOders;
