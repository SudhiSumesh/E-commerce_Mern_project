import { Navbar as Nav } from "flowbite-react";
import FormModal from "../uiElements/FormModal";

const NavBar = () => {
  return (
    <>
      <Nav fluid rounded>
        <Nav.Brand>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Salalah.
          </span>
        </Nav.Brand>
        <div className="flex md:order-2">
          <FormModal /> {/*form modal */}
          <Nav.Toggle />
        </div>
        <Nav.Collapse>
          <Nav.Link href="" active>
            Home
          </Nav.Link>
          <Nav.Link href="">About</Nav.Link>
          <Nav.Link href="">Services</Nav.Link>
          <Nav.Link href="">Pricing</Nav.Link>
          <Nav.Link href="">Contact</Nav.Link>
        </Nav.Collapse>
      </Nav>
    </>
  )};
export default NavBar;
