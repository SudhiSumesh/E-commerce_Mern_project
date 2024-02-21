import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
const HomeHeroSection = () => {
  return (
    <div className="container  md:my-4 ">
      <div className="flex items-center justify-between">
        <div className="text-4xl  py-5 main-font">DISCOVER</div>
        <Link to="/products" className="text-lg ">
          More
          <FontAwesomeIcon icon={faChevronRight} className=" px-2" />
        </Link>
      </div>

      <div className="my-8 overflow-hidden rounded-2xl cursor-pointer">
        <img
          src="/assets/images/prifile icon.jpg"
          alt="homepage-hero-image"
          className="rounded-2xl transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="my-2 overflow-hidden rounded-2xl cursor-pointer">
        <img
          src="/assets/images/home-discover-3.jpg"
          alt="homepage-hero-image"
          className="rounded-2xl transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="my-8 overflow-hidden rounded-2xl cursor-pointer">
        <img
          src="/assets/images/home-discover-2.jpg"
          alt="homepage-hero-image"
          className="rounded-2xl transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default HomeHeroSection;
