import React from "react";
import Layout from "../Components/Layout/Layout";
import HomeHeroSection from "../Components/Sections/homeHeroSection";
import HomeVideoSection from "../Components/Sections/HomeVideoSection";

function HomePage() {
  return (
    <Layout>
     <HomeVideoSection/>
     <HomeHeroSection/>
    </Layout>
  )};
export default HomePage;
