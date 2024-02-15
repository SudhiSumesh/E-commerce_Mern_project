import React, { useState } from 'react'
import {  Button, Modal } from "flowbite-react";
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const FormModal = () => {
    const [action,setAction]=useState("login")
       const [openModal, setOpenModal] = useState(false);

       function onCloseModal() {
         setOpenModal(false);
        setAction('login')
       }
  return (
    <>
      <div
        className="px-2 text-xl rounded-lg self-center hover:underline hover:text-[blue] cursor-pointer transition-all duration-700"
        outline
        gradientDuoTone="purpleToBlue"
        onClick={() => setOpenModal(true)}
      >
        Login
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {action === "login" ? (
              // display login form
              <>
                <LoginForm onCloseModal={onCloseModal} />
                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?&nbsp;
                  <a
                    className="text-cyan-700 hover:underline dark:text-cyan-500"
                    onClick={() => setAction("signup")}
                  >
                    Create account
                  </a>
                </div>
              </>
            ) : (
              // display registraino form
              <>
                <RegistrationForm setAction={setAction} />
                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300 ">
                  Already have account?&nbsp;
                  <a
                    className="text-cyan-700 hover:underline dark:text-cyan-500"
                    onClick={() => setAction("login")}
                  >
                    login to your account
                  </a>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );};
export default FormModal
