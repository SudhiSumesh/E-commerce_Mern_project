import React from "react";

const CustumerReviews = () => {
  return (
    <>
      {/* customer reviews */}
      <div className="container py-10 ">
        <div className="text-3xl font-bold py-8">Happy Customer Reviews.</div>
        <div className="flex gap-20">
          <div className=" ">
            <div>
              <div className="text-xl font-bold text-[#ff9100]">Carol G.</div>
              <div className="py-3">
                Awesome Services. I purchased a smartphone from this ecommerce
                platform and I am extremely satisfied with my purchase.
              </div>
              <div className="pb-1">10/24/2023</div>
            </div>
          </div>
          <div className="">
            <div>
              <div className="text-xl font-bold text-[#ff9100]">Peter R.</div>
              <div className="py-3">
                I had a great experience purchasing a smartphone from this
                ecommerce platform. The website was user-friendly and the
                selection of phones was impressive
              </div>
              <div className="pb-1">9/14/2023</div>
            </div>
          </div>
          <div className="">
            <div>
              <div className="text-xl font-bold text-[#ff9100]">George G.</div>
              <div className="py-3">
                I am extremely satisfied with my purchase. The website was easy
                to navigate and the checkout process was quick and simple
              </div>
              <div>8/04/2023</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustumerReviews;
