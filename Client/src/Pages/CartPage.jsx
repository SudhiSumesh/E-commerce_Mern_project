import React from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../Context/cart";

const CartPage = () => {
  const [cart, setCart] = useCart();
  //remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  // cart grant total
  const grantTotal = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));

      console.log(total);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid bg-gray-100 py-5">
        <div className="px-5 pt-5 ms-5 pb-2 font-semibold">Home / Cart</div>
        <div className="container " id="cart_container">
          <div className="px-5 bg-white pb-3 mb-3">
            <div className="pt-5 flex flex-col md:flex-row gap-5 gap-md-0 justify-between border-b border-gray-200">
              <div className="font-semibold text-lg md:pl-5 md:pr-5">
                Product
              </div>
              <div className="font-semibold text-lg md:pl-5 md:ml-20">Amount</div>
              <div className="font-semibold text-lg md:pr-5">Quantity</div>
              <div className="font-semibold text-lg md:pr-5">Total</div>
              <div className="font-semibold text-lg md:pr-5"></div>
            </div>
            {/* Cart items */}
            {cart?.length <= 0 ? (
              <div className="text-[red]  text-center my-10 text-xl">
                Your Cart is Empty !
              </div>
            ) : (
              cart?.map((c) => (
                <div
                  className="flex flex-col md:flex-row justify-between items-center px-5 mt-3"
                  key={c._id}
                >
                  <div className="py-4 md:py-5 flex items-center gap-3">
                   
                    
                    <div>
                      <img
                        crossOrigin=""
                        src={`http://localhost:4000/images/${c.imageOne}`}
                        alt="img"
                        width="100px"
                      />
                    </div>
                    <div className="w-[100px]">
                      <div className="font-semibold text-lg">{c.name}</div>
                      <div className="text-muted text-sm">
                        {c.category.name}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-lg ml-4">
                    ${c.price}.00
                  </div>
                  <div className="flex justify-center items-center gap-1 mt-3 ml-16 md:mt-0">
                    <img
                      src="/assets/images/minus.png"
                      alt=""
                      className="w-6 h-6 cursor-pointer cart-minus"
                    />
                    <div
                      type="number"
                      name=""
                      className="w-8 h-8 pl-2 pr-2 border-none mb-2 text-center text-xl font-semibold "
                    >
                      1
                    </div>
                    <img
                      src="/assets/images/add.png"
                      alt=""
                      className="w-6 h-6 cursor-pointer cart-add"
                    />
                  </div>
                  <div className="flex items-center gap-5 mt-3 md:mt-0">
                    <div className="font-semibold text-lg text-black">
                      $item.totalPrice.00
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mt-3 md:mt-0">
                    <button
                      onClick={() => removeCartItem(c._id)}
                      className="font-normal text-md cursor-pointer text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="container">
            <div className="flex justify-end">
              {/* <button className="delete btn text-red-500"> Remove items</button> */}
            </div>
            <div className="px-5 bg-white pb-3 mt-5">
              <div className="flex items-center gap-5 justify-end p-5">
                <a className="text-black cursor-pointer text-lg font-semibold">
                  Total : {grantTotal()}
                </a>
                <div className="flex flex-col gap-3">
                  <a className="p-3 px-4 cursor-pointer text-white bg-[red] rounded-full  text-lg">
                    Check out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
