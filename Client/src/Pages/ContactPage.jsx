import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Button, Label, TextInput } from 'flowbite-react';

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
        <div className="p-5">
          <div className="text-3xl font-semibold underline text-center">
            Connect with Us
          </div>
          <p className="pt-3 text-center  font-semibold">
            Fill out the form bellow and we will contact you as soon as possible
            !
          </p>
          <form >
            <div className=" flex flex-col">
             
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your Name" />
                  </div>
                  <TextInput
                    id="email1"
                    type="email"
                    placeholder=""
                    required
                  />          
             
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your email" />
                  </div>
                  <TextInput
                    id="email1"
                    type="email"
                   
                    required
                  />
                </div>
      <div className='flex flex-col'>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Choose Topic" />
                  </div>
                  <TextInput
                    id="email1"
                    type="email"
                   
                    required
                  />
         
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your Message" />
                  </div>
                  <TextInput
                    id="email1"
                    type="email"
                   
                    required
                  />
                </div>
                <div className="px-5 py-3 flex justify-end">
                  <Button className=" bg-black py-2 px-5 rounded-full ">
                    Send
                  </Button>
                </div>
              </div>
          
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage
