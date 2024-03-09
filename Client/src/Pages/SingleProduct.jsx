import React, { useEffect, useState } from "react";
import CoustumerReviews from "../Components/Sections/CostumerReviews";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactImageMagnify from "react-image-magnify";
import toast, { Toaster } from "react-hot-toast";
import {
  faCartArrowDown,
  faBagShopping,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "flowbite-react";
import { useAuth } from "../Context/auth";

function SingleProduct() {
  const [product, setProduct] = useState({});
  const [auth, setAuth] = useAuth();
  const [relatedProducts, setRelatedProduct] = useState([]);
  const params = useParams();
  // useeffect
  useEffect(() => {
    getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_GET_PRODUCT_URL}/${params.slug}`
      );

      if (data.success) {
        setProduct(data?.product);
        getSimilarProduct(data?.product?._id, data?.product.category._id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get similar product

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_GET_SIMILAR_PRODUCT_URL}/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //add to cart fun
  const addToCart = async (product) => {
    try {
      if (auth?.user) {
        const quantity = 1;
        const { data } = await axios.put(import.meta.env.VITE_ADD_TO_CART_URL, {
          productId: product._id,
          quantity,
        });
        if (data.success) {
          setAuth({ ...auth, user: data?.user });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data?.user;
          localStorage.setItem("auth", JSON.stringify(ls));

          toast.success("item added to cart");
        }
      } else {
        toast("login required");
      }
    } catch (error) {
      console.log(error);
      toast.error("errror in adding item to cart");
    }
  };

  // Open Razorpay modal
  const handleOpenRazorpay = (order, amount, userCart) => {
    const options = {
      key: import.meta.env.VITE_RAZOR_API_KEY_ID,
      amount: Number(order.amount * 100),
      currency: order.currency,
      name: "Salalah.",
      description: "Find the smartphone thats right for you",
      order_id: order.id,
      //verify payment
      handler: async function (response) {
        const { data } = await axios.post(
          import.meta.env.VITE_PAYMENT_VERIFY_URL,
          { ...response, userOrder: userCart, amount }
        );
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error("error in verification");
        }
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  //handle payment
  const handlePayment = async (product) => {
    try {
      if (auth?.user) {
        const userCart = [{ product, quantity: 1 }];
        //check if stock is out
        const outOfStock = userCart.findIndex((item) => {
          return item.product.quantity === 0;
        });
        if (outOfStock !== -1) {
          toast.error(
            `${userCart[outOfStock].product.name} is currently out of stock please try later`
          );
        } else {
          const amount = product.price;
          const { data } = await axios.post(
            import.meta.env.VITE_PAYMENT_ORDER_URL,
            {
              amount,
            }
          );
          if (data.success) {
            handleOpenRazorpay(data.order, data.amount, userCart);
          }
        }
      } else {
        toast.error("please login to checkout");
      }
    } catch (error) {
      console.log(error);
      toast.error("error in check out");
    }
  };

  //image urls
  const imgUrl = `http://localhost:4000/images/${product.imageOne}`;
  const imgUrlTwo = `http://localhost:4000/images/${product.imageTwo}`;
  const imgUrlThree = `http://localhost:4000/images/${product.imageThree}`;

  return (
    <Layout>
      <div className="container py-5">
        <div className="pt-5 mt-3">
          <div>
            <div className="py-5">
              <span className="font-semibold">Home/</span>
              <span className="font-semibold"> Shop/ </span> Product
            </div>
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-20">
            <div className="col-span-1">
              <div className="flex flex-col md:flex-row items-center border rounded py-2">
                <div className="flex ms-3 md:flex-col justify-center md:justify-start">
                  {/* side-bar */}
                  <div className="p-2 mb-3  border rounded-lg ">
                    <img
                      src={imgUrlThree}
                      crossOrigin=""
                      alt=""
                      className="side-image"
                      width="150px"
                      height="150px"
                    />
                  </div>

                  <div className="p-2 mb-3 border rounded-lg side-img">
                    <img
                      crossOrigin=""
                      src={imgUrlTwo}
                      alt="side img"
                      width="150px"
                      height="150px"
                      className="side-image"
                    />
                  </div>
                  <div className="p-2 mb-3 border rounded-lg side-img">
                    <img
                      crossOrigin=""
                      src={imgUrl}
                      alt="side img"
                      width="150px"
                      height="150px"
                      className="side-image"
                    />
                  </div>
                </div>
                {/* product img */}
                <div className="  p-5 py-3 text-center ">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "phone",
                        isFluidWidth: true,
                        src: "https://www.xda-developers.com/files/2022/09/iPhone-14-midnight.jpg",
                        crossOrigin: "anonymous",
                      },
                      largeImage: {
                        alt: "phone",
                        src: "https://www.xda-developers.com/files/2022/09/iPhone-14-midnight.jpg",
                        width: 800,
                        height: 1100,
                        crossOrigin: "anonymous",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="p-5 flex justify-between md:justify-center gap-20 ms-20 mt-20">
                <button
                  className="p-3 pe-6 bg-[orange] rounded-md font-semibold text-base text-white"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  <FontAwesomeIcon
                    className="fas fa-bag-shopping px-3 "
                    icon={faCartArrowDown}
                  />
                  ADD TO CART
                </button>
                <button
                  onClick={() => {
                    handlePayment(product);
                  }}
                  className="p-3 rounded-md pe-6 bg-[tomato] text-white  font-semibold text-base cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="fas fa-bag-shopping px-3"
                    icon={faBagShopping}
                  />
                  BUY NOW
                </button>
              </div>
            </div>
            <div className="col-span-1">
              <div className="border-b pb-2">
                <h4 className="font-semibold py-4">{product.name}</h4>
                <p className="text-sm text-gray-500 font-semibold py-3">
                  <span className="px-4 py-2.5 rounded-md m bg-green-600 text-white me-2">
                    {product.rating}.3
                  </span>
                  46,238 Ratings and 2.453 Reviews
                </p>
                <p className="text-green-500 font-semibold my-2">
                  Extra ₹600 off
                </p>
                <div
                  className="text-red-500 text-3xl font-semibold"
                  id="total-price"
                >
                  ₹{product.price}.00
                </div>
              </div>
              <div className="flex py-5 justify-start gap-20 border-b">
                <div className="font-semibold text-lg">Offer</div>
                <ul className="list-disc list-inside">
                  <li className="py-1  list-none">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    Get(Make My Trip) travel voucher
                  </li>
                  <li className="py-1  list-none">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    Upto ₹750 Cashback on Bajaj EMI Card
                  </li>
                  <li className="py-1 list-none ">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    Upto ₹4000 Cashback using Paytm
                  </li>
                  <li className="py-1   list-none">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    Chance to Win Free Goa Tickets
                  </li>
                  <li className="py-1 list-none ">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    15 Day Replacement Policy
                  </li>
                  <li className="py-1 list-none ">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    Get Upto Rs.2500 instant Discount
                  </li>
                  <li className="py-1 list-none ">
                    <FontAwesomeIcon
                      className="px-2"
                      icon={faTag}
                      style={{ color: "#f13f04" }}
                    ></FontAwesomeIcon>
                    Delay in delivery
                  </li>
                </ul>
              </div>
              <div className="py-5">
                <div className="font-semibold text-lg py-2">Specification</div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-0">
                  <button className=" bg-gray-200 p-2 rounded-md font-normal border ms-5 md:ms-0">
                    8GB+128(5G)
                  </button>
                  <button className="bg-gray-200 p-2 rounded-md font-normal border ms-5">
                    8GB+128(5G)
                  </button>
                  <button className="bg-gray-200 p-2 rounded-md font-normal border ms-5">
                    8GB+128(5G)
                  </button>
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg py-3">Varient</div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <div className="p-3 border rounded-lg">
                    <img
                      crossOrigin=""
                      src={imgUrlThree}
                      alt=""
                      width="100px"
                    />
                  </div>
                  <div className="p-3 border rounded-lg">
                    <img crossOrigin="" src={imgUrl} alt="" width="100px" />
                  </div>
                </div>
              </div>
              {/* <div className="py-5 flex items-center justify-between">
                <div className="font-semibold text-lg">Quantity</div>
                <div className="flex">
                  <img
                    src="/assets/images/minus.png"
                    alt=""
                    className="pdt-minus"
                    id="pdt-minus"
                  />
                  <div className="px-3" id="quantity">
                    1
                  </div>
                  <img
                    src="/assets/images/add.png"
                    alt=""
                    className="pdt-add"
                    id="pdt-add"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold text-lg">Payment</div>
                <div className="font-semibold text-lg">
                  Cash on delivery available.
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-4xl my-10">
        {relatedProducts.length > 0
          ? "Related Products."
          : "No Releated products"}
      </div>

      <div className="container flex flex-wrap gap-5">
        {/* map products */}
        {relatedProducts?.map((product) => (
          <Card className="w-[320px] my-6" key={product._id}>
            <img
              crossOrigin=""
              src={`http://localhost:4000/images/${product.imageTwo}`}
              alt={product.slug}
            />
            <Link
              to={`/product/${product.slug}`}
              className="hover:underline  overflow-hidden"
            >
              <h5 className="  text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {`${product.name}, ${product.description}`}
              </h5>
            </Link>
            <div className="mb-5 mt-2.5 flex items-center">
              <svg
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                {product.rating}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {`$${product.price}`}
              </span>
              <Link
                to=""
                onClick={() => {
                  addToCart(product);
                }}
                className="rounded-lg bg-[#ffc107] px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-[#ffc105] focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Add to cart
              </Link>
            </div>
          </Card>
        ))}
        {/* card end */}
      </div>
      <Toaster />
      <CoustumerReviews />
    </Layout>
  );
}

export default SingleProduct;
