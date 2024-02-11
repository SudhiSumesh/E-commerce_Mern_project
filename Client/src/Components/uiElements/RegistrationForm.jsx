import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const RegistrationForm = ({ setAction }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  //destructure values 
  const { name, email, password, phone, address } = inputValue;
  //input onchange handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // error || success message with tosatify
  //  toast err
  const handleError = (err) =>
    toast.error(err, {
      position: "top-center",
    });
  //toast success
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
    });

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      //destructure response data
      const { success, message, user } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          setAction("login"); //  switch to  login modal 
          console.log(user);
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    //set default input values
    setInputValue({
      ...inputValue,
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    });

  };

  return (
    <>
      <form className="flex flex-col max-w-md gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="block mb-2">
            {/*input name */}
            <Label htmlFor="small" value="Full Name" />
          </div>
          <TextInput
            className="text-black"
            id="small"
            type="text"
            name="name"
            value={name}
            sizing="sm"
            onChange={handleOnChange}
          />
        </div>
        {/* email input*/}
        <div>
          <div className="block mb-2">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            type="email"
            name="email"
            value={email}
            placeholder="abc@gmail.com"
            onChange={handleOnChange}
            required
            shadow
          />
        </div>
        {/* password input */}
        <div>
          <div className="block mb-2">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            name="password"
            value={password}
            required
            shadow
            onChange={handleOnChange}
          />
        </div>
        <div>
          {/* confirm password */}
          <div className="block mb-2">
            <Label htmlFor="repeat-password" value="Confirm password" />
          </div>

          <TextInput
            id="repeat-password"
            type="password"
            // onChange={handleOnChange}
            required
            shadow
          />
        </div>
        <div>
          {/* input phone */}
          <div className="block mb-2">
            <Label htmlFor="base" value="Mobile" />
          </div>
          <TextInput
            id="base"
            type="text"
            sizing="md"
            name="phone"
            onChange={handleOnChange}
            value={phone}
          />
        </div>
        {/*input  address */}
        <div>
          <div className="block mb-2">
            <Label htmlFor="large" value="Address" />
          </div>
          <TextInput
            id="large"
            type="text"
            sizing="lg"
            name="address"
            onChange={handleOnChange}
            value={address}
          />
        </div>
        {/* checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <a className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </a>
          </Label>
        </div>
        {/* register btn */}
        <Button type="submit">Register new account</Button>
      </form>
        <ToastContainer/>
    </>
  );
};
export default RegistrationForm;