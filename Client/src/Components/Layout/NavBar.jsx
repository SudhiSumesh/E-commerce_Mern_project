import { Navbar as Nav } from "flowbite-react";
import FormModal from "../uiElements/FormModal";
import SearchBar from "../uiElements/SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
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
          <Link to={"/cart"}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl self-center p-2 mt-1 hover:text-[blue] cursor-pointer"
            />
          </Link>
          <FormModal /> {/*form modal */}
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
