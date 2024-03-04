import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/auth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [deleted, setDeleted] = useState(false);
  const [stock, setStock] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const navigate = useNavigate();
  // useEffect

  useEffect(() => {
    getUserCart();
  }, [auth, deleted, stock]);
  //get user cart
  const getUserCart = async () => {
    if (auth?.user) {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_GET_USER_CART_URL
        );
        if (data.success) {
          setUserCart(data.cart.items);
          console.log("cart", { userCart });
        }
      } catch (error) {
        console.log(error);
        console.log("error in getting  cart");
      }
    }
  };
  //increment
  const handleIncrement = async (pid, prevQty, pdtQty) => {
    try {
      if (auth?.user) {
        const newQty = prevQty >= pdtQty ? 0 : 1;
        if (newQty === 0) {
          toast(`only ${pdtQty} item left in stock`);
        }
        const { data } = await axios.put(import.meta.env.VITE_ADD_TO_CART_URL, {
          productId: pid,
          quantity: newQty,
        });
        if (data.success) {
          setAuth({ ...auth, user: data?.user });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data?.user;
          localStorage.setItem("auth", JSON.stringify(ls));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("error in adding item");
    }
  };
  //decriment
  const handleDecrement = async (pid, prevQty) => {
    try {
      if (auth?.user) {
        const newQty = prevQty > 1 ? -1 : 0;

        const { data } = await axios.put(import.meta.env.VITE_ADD_TO_CART_URL, {
          productId: pid,
          quantity: newQty,
        });
        if (data.success) {
          setAuth({ ...auth, user: data?.user });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data?.user;
          localStorage.setItem("auth", JSON.stringify(ls));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("error in adding item");
    }
  };
  //remove cart item
  const removeCartItem = async (pid) => {
    if (auth.user) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_DELETE_CART_ITEM_URL}/${pid}`
        );
        if (data.success) {
          setDeleted(!deleted);
          toast.success(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("error in deleting item");
      }
    } else {
    }
  };
  // cart grant total
  const grantTotal = () => {
    try {
      let total = 0;
      userCart?.map(
        (item) => (total = total + item.product.price * item.quantity)
      );

      // console.log(total);
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  // Open Razorpay modal
  const handleOpenRazorpay = (order, amount) => {
    const options = {
      key: import.meta.env.VITE_RAZOR_API_KEY_ID,
      amount: Number(order.amount * 100),
      currency: order.currency,
      name: "Salalah.",
      description: "Find the smartphone thats right for you",
      order_id: order.id,
      //verify
      handler: async function (response) {
        // console.log(response);
        const { data } = await axios.post(
          import.meta.env.VITE_PAYMENT_VERIFY_URL,
          { ...response, userOrder: userCart, amount }
        );
        if (data.success) {
          toast.success(data.message);
           navigate("/settings/my-orders");
        } else {
          toast.error("error in verification");
        }
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  //handle payment
  const handlePayment = async () => {
    // setStock(!stock)
    try {
      if (auth?.user) {
        //check if stock is out
        const outOfStock = userCart.findIndex((item) => {
          return item.product.quantity === 0;
        });
        if (outOfStock !== -1) {
          toast.error(
            `${userCart[outOfStock].product.name} is currently out of stock please try later`
          );
        } else {
          const amount = grantTotal();
          const { data } = await axios.post(
            import.meta.env.VITE_PAYMENT_ORDER_URL,
            {
              amount,
            }
          );
          if (data.success) {
            // console.log(data.order);
            handleOpenRazorpay(data.order, data.amount);
          }
        }
      }else{
        toast.error("login required to check out")
      }
    } catch (error) {
      console.log(error);
      toast.error("error in check out");
    }
  };
  return (
    <Layout>
      <div className="container-fluid bg-gray-100 py-5">
        <div className="px-5 pt-5 ms-5 pb-2 font-semibold">Home / Cart</div>
        <div className="container ">
          <div className="px-5  bg-white pb-3 mb-3">
            <div className="pt-5  flex flex-col md:flex-row gap-5 gap-md-0 justify-between border-b border-gray-200 ">
              <div className="font-semibold text-lg md:pl-5 md:pr-5">
                Product
              </div>
              <div className="font-semibold text-lg md:pl-5 md:ml-20">
                Amount
              </div>
              <div className="font-semibold text-lg md:pr-5">Quantity</div>
              <div className="font-semibold text-lg md:pr-5">Total</div>
              <div className="font-semibold text-lg md:pr-5"></div>
            </div>
            {/* Cart items */}
            {auth?.user ? (
              userCart?.length <= 0 ? (
                <div className="text-[red]  text-center my-10 text-xl">
                  Your Cart is Empty !
                </div>
              ) : (
                userCart?.map((item) => (
                  <div
                    className="flex flex-col md:flex-row justify-between items-center px-5 mt-3 "
                    key={item._id}
                  >
                    <div className="py-4 md:py-5 flex items-center gap-3">
                      <div className="">
                        {item.product.quantity === 0 ? (
                          <span className=" p-1 bg-[#ff0000]  rounded-md text-[#ffffff] text-center">
                            Out of stock
                          </span>
                        ) : (
                          ""
                        )}
                        <img
                          crossOrigin=""
                          src={`http://localhost:4000/images/${item.product.imageOne}`}
                          alt="img"
                          width="100px"
                          className="mt-2"
                        />
                      </div>
                      <div className="w-[150px]">
                        <div className="font-semibold text-lg">
                          {item.product.name}
                        </div>
                        <div className="text-muted text-[14px]">
                          {item.product.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-lg ml-4">
                      ${item.product.price}.00
                    </div>
                    <div className="flex justify-center items-center gap-1 mt-3 ml-16 md:mt-0">
                      <img
                        onClick={() =>
                          handleDecrement(item.product._id, item.quantity)
                        }
                        src="/assets/images/minus.png"
                        alt=""
                        className="w-6 h-6 cursor-pointer cart-minus"
                      />
                      <div
                        type="number"
                        name=""
                        className="w-8 h-8 pl-2 pr-2 border-none mb-2 text-center text-xl font-semibold "
                      >
                        {item.quantity}
                      </div>
                      <img
                        onClick={() =>
                          handleIncrement(
                            item.product._id,
                            item.quantity,
                            item.product.quantity
                          )
                        }
                        src="/assets/images/add.png"
                        alt=""
                        className="w-6 h-6 cursor-pointer cart-add"
                      />
                    </div>
                    <div className="flex items-center gap-5 mt-3 md:mt-0">
                      <div className="font-semibold text-lg text-black">
                        ${item.product.price * item.quantity}.00
                      </div>
                    </div>
                    <div className="flex items-center gap-5 mt-3 md:mt-0">
                      <button
                        onClick={() => removeCartItem(item._id)}
                        className="font-normal text-md cursor-pointer text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="flex justify-center my-14">
                {" "}
                <Link
                  className="bg-[red] p-3 rounded-md mx-10 text-white "
                  to={"/"}
                >
                  Login To See Your Cart
                </Link>
              </div>
            )}
          </div>
          <div className="container">
            <div className="flex justify-end">
              {/* <button className="delete btn text-red-500"> Remove items</button> */}
            </div>
            <div className="px-5 bg-white pb-3 mt-5">
              <div className="flex items-center gap-5 justify-end p-5">
                <a className="text-black cursor-pointer text-lg font-semibold">
                  Total : ${grantTotal()}.00
                </a>
                <div className="flex flex-col gap-3">
            {  userCart?.length > 0  ?   <button
                    onClick={handlePayment}
                    className="p-3 px-4 cursor-pointer text-white bg-[red] rounded-full  text-lg"
                  >
                    Check out
                  </button> :""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default CartPage;
