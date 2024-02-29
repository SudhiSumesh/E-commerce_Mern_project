import { Card, Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useCart } from "../Context/cart";

function ProductsPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  // console.log(auth);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_GET_PRODUCT_URL);
      if (data?.success) {
        // console.log(data.message);
        setProducts(data.products);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("error in getting pdt");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96  p-10 container">
        <Carousel className="h-[400px]">
          <img
            src={`http://localhost:4000/images/${products[2]?.imageTwo}`}
            alt="first img"
            crossOrigin=""
            width="300px"
            height="400px"
          />
          <img
            src={`http://localhost:4000/images/${products[2]?.imageOne}`}
            alt="second img"
            crossOrigin=""
          />
          <img
            src={`http://localhost:4000/images/${products[0]?.imageThree}`}
            alt="thrid img"
            crossOrigin=""
          />
        </Carousel>
      </div>
      <div className="ms-20  text-4xl my-10 mt-36">
        Find the phone that's right for you.
      </div>

      <div className="container flex flex-wrap gap-5">
        {/* map products */}
        {products?.map((product) => (
          <Card className="w-[320px]  my-6" key={product._id}>
            <img
              crossOrigin=""
              src={`http://localhost:4000/images/${product.imageTwo}`}
              alt={product.slug}
              width="300px"
              height={"70px"}
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
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  // toast.success("item added to cart");
                }}
                className="rounded-md bg-[#ffc107] px-5 py-2.5 text-center text-sm font-medium text-[black]  hover:bg-[#e7a543] focus:outline-none  focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Add to cart
              </Link>
            </div>
          </Card>
        ))}
        {/* card end */}
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default ProductsPage;
