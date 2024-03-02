import { Navbar as Nav } from "flowbite-react";
import FormModal from "../uiElements/FormModal";
import SearchBar from "../uiElements/SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Context/auth";
import DropDownModal from "../uiElements/DropDownModal";
import { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-hot-toast";

const NavBar = () => {
  const [auth] = useAuth();
  const [userCart, setUserCart] = useState([]);
  // gett cart
  useEffect(() => {
    getUserCart();
  }, [auth]);
  //get user cart
  const getUserCart = async () => {
    if (auth?.user) {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_GET_USER_CART_URL
        );
        if (data.success) {
          setUserCart(data.cart.items);
          //  console.log(cartLength);
        }
      } catch (error) {
        console.log(error);
        console.log("error in getting  cart");
      }
    }
  };
  return (
    <div className="border-b-2 sticky top-0 z-10 bg-white">
      <Nav fluid rounded className="container rounded-none p-4 ">
        <Nav.Brand>
          <Link
            to={"/"}
            className="self-center text-4xl   text-[black] hover:text-[blue] hover:underline transition-all duration-700 "
          >
            salalah.
          </Link>
        </Nav.Brand>
        <SearchBar /> {/* search bar */}
        <div className="flex md:order-2">
          <Link to={"/cart"} className=" relative  inline-flex items-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className=" text-2xl self-center p-2 mt-1 hover:text-[blue] cursor-pointer"
            ></FontAwesomeIcon>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -bottom-1 -end-1 dark:border-gray-900">
              {userCart?.length }
            </div>
          </Link>
          {auth?.user ? <DropDownModal /> : <FormModal />}
          <Nav.Toggle />
        </div>
        <Nav.Collapse>
          <Link
            to={"/"}
            className="text-xl font-normal hover:text-[blue] hover:underline transition-all duration-700"
          >
            Home
          </Link>
          <Link
            className="text-xl font-normal hover:text-[blue] hover:underline transition-all duration-700"
            to={"/products"}
          >
            Products
          </Link>

          <Link
            className="text-xl font-normal hover:text-[blue] hover:underline transition-all duration-700"
            to={"/about"}
          >
            About
          </Link>
          <Link
            className="text-xl font-normal hover:text-[blue] hover:underline transition-all duration-700"
            to={"/contact"}
          >
            Contact
          </Link>
        </Nav.Collapse>
      </Nav>
    </div>
  );
};
export default NavBar;
