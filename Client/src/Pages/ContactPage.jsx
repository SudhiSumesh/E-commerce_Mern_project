import React from "react";
import Layout from "../Components/Layout/Layout";
import { Button, Label, TextInput } from "flowbite-react";

const ContactPage = () => {
  return (
    <Layout>
      {/* contactUs main sec */}
      <div className="container p-5">
        <div className="flex flex-col items-center p-5">
          <h1 className="text-8xl text-black fw-bold py-5">Contact Us</h1>
          <div className="text-center">
            <img
              src="/assets/images/contact.us.jpg"
              alt="contact us"
              className=""
            />
          </div>
        </div>
        {/* connect with us */}
        <div className="p-5 mt-10">
          <div className="text-3xl my-4 font-bold underline text-center">
            Connect with Us
          </div>
          <p className="pt-3 text-center font-bold mb-6">
            Fill out the form below and we will contact you as soon as possible!
          </p>
          <form className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="py-5 px-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className=" border-t-0 border-r-0 border-l-0 border-b-2 rounded-sm px-3 py-2 w-full"
                />
              </div>
              <div className="py-5 px-5">
                <select
                  placeholder="Your Email"
                  className=" border-t-0 border-r-0 border-l-0 border-b-2 rounded-sm px-3 py-2 w-full"
                >
                  <option value="">Choose Topic</option>
                  <option value="">About shopping</option>
                  <option value="">About Services</option>
                  <option value="">About pricing</option>
                </select>
              </div>
              <div className="py-5 px-5">
                <input
                  type="email"
                  placeholder="Your Email"
                  className=" border-t-0 border-r-0 border-l-0 border-b-2 rounded-sm px-3 py-2 w-full"
                />
              </div>
              <div className="py-5 px-5">
                <input
                  type="email"
                  placeholder="Message"
                  className=" border-t-0 border-r-0 border-l-0 border-b-2 rounded-sm px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="px-5 py-3 flex justify-end">
              <button className=" bg-black text-white py-3 px-14 rounded-full">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
