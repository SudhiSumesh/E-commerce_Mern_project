import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function HomeVideoSection() {
  // Function to handle right-click event
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default context menu
  };
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        onContextMenu={handleContextMenu}
        muted
        className="md:min-h-[97.15vh] mb-4"
      >
        <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
        {/*fallback content in case the video cannot be played */}
        video
      </video>
      <div className=" w-[35%] ms-4  absolute top-[130px]  left-16   text-[#000000] hidden md:block">
        <h1 className="text-[2.6rem]">Find the phone that's right for you</h1>
        <p className="my-3 text-[#000000]">
          Explore all the new products from UNPACKED. We identifies the vast
          number of our fellows. We hope to empower them .
        </p>
        <div className="flex">
          <Link
            to={"/cart"}
            className=" flex justify-center mt-8  py-2 px-8 rounded-3xl transition-transform duration-1000 hover:scale-105 hover:text-[#415FFF] border-2 border-[black] hover:border-[#415FFF]"
          >
            <span>Shop Now</span>
            <FontAwesomeIcon icon={faChevronRight} className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeVideoSection;
