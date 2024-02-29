import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterContainer = () => {
  return (
    <Footer container className="bg-[#02020b] rounded-none">
      <div className="w-full ">
        <div className=" grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="text-[white] text-2xl my-2">Salalah.</div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Our Services</Footer.Link>
                <Footer.Link href="#">Privacy & Policy</Footer.Link>
                <Footer.Link href="#">Affiliate program</Footer.Link>
                <Footer.Link href="#">Company</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Get Help" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Shipping</Footer.Link>
                <Footer.Link href="#">Returns</Footer.Link>
                <Footer.Link href="#">FAQ</Footer.Link>
                <Footer.Link href="#">Order Status</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy & Policy</Footer.Link>
                <Footer.Link href="#">Payment Options</Footer.Link>
                <Footer.Link href="#">Order Status</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="" by="Salalah™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterContainer;
