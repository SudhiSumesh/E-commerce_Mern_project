import React from 'react'
import Layout from '../Components/Layout/Layout'
import CustumerReviews from '../Components/Sections/CostumerReviews';

const AboutPage = () => {
  return (
    <Layout>
          <>
  {/* about sec */}
  <div className=" about-bg flex items-center mb-4">
    <div className="container  ">
      <div className="ms-10">
        <div className="text-4xl ">
          About 
        </div>
        <div className="text-8xl  mb-3  underline underline-offset-3 ">
          salalah.
        </div>
      </div>
      <p className="w-1/2 pt-0 ms-10"><span className="font-bold">salalah 
        </span> is a e-commerce company that sells great products based
        on a design-driven value, with smart devices and intelligent services as its core.</p>
    </div> 
  </div>
  <div className="container shadow-sm rounded-md border    p-10 bg-white">
    <div className="flex  justify-between container p-10 my-10-3">
      <div className="p-3  border-e-4 w-75 ">
        <h1 className="text-4xl">Mission</h1>
        <p className="w-75 ">Sells great products for users
          Create a joyful and progressive environment for employees
          Create win-win platforms for partners based on mutual trust
          Render steady long term returns on investment for shareholders</p>
      </div>
      <div className="p-3 md:px-5 ">
        <div className="pb-2">
          <h1 className='text-4xl'>Vision</h1>
          <p className="">Develop into a healthier, more sustainable world-class corporation</p>
        </div>
        <div className>
          <h1 className='text-4xl'>Core value</h1>
          <p className="">Trusted,Benfen, user-orientation, continuous learning and team spirit</p>
        </div>
      </div>
    </div>
  </div>
  <CustumerReviews/>
</>

    </Layout>
  );
}

export default AboutPage
