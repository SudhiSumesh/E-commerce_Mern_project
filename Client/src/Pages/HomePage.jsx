import React from "react";
import Layout from "../Components/Layout/Layout";
import HomeHeroSection from "../Components/Sections/homeHeroSection";
import HomeVideoSection from "../Components/Sections/HomeVideoSection";
import WhyShopWithUs from "../Components/Sections/WhyShopWithUs";
import CustumerReviews from "../Components/Sections/CostumerReviews";

function HomePage() {
  return (
    <Layout>
      <HomeVideoSection />
      <WhyShopWithUs />
      <HomeHeroSection />
      <CustumerReviews />
    </Layout>
  );
}
export default HomePage;
