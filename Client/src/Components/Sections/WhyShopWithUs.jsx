import React from 'react'

function WhyShopWithUs() {

  return (
    // {/* why-shop-with-us-sec */}
    <div className="container p-14">
      <div
        className="flex justify-between md:mt-5 pb-3 border-b cursor-pointer
  "
      >
        <div>
          <div className="flex flex-col items-center">
            <img src="/assets/images/rupee (1).png" />
            <p>15 Days Price Guatantee</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <img src="/assets/images/price-tag.png" />
            <p>No Cost EMI</p>
          </div>
        </div>
        <div>
          <p className="flex flex-col items-center">
            <img src="/assets/images/healthcare.png" />
            <p>
              Free Shipping on orders
            </p>
          </p>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <img src="/assets/images/24-hours-support.png" />
            <p>24*7 Service Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyShopWithUs;
