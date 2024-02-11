import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = ({ onCloseModal }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  // destructure values
  const { email, password } = inputValue;
  //handle on change
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

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      // destructure response data
      const { success, message, user } = data;
      
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          onCloseModal(); //close modal
          navigate("/");
          console.log(user);
        }, 1000);
        
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    //set default input values
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  return (
    <>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign in
      </h3>
      <form onSubmit={handleSubmit}>
        {/* email input */}
        <div className="py-3">
          <div className="block mb-2">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            placeholder="name@gmail.com"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          />
        </div>
        {/* password input */}
        <div>
          <div className="block mb-2">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex justify-between">
          {/* checkbox */}
          <div className="flex items-center gap-2 py-3">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <a className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
            Lost Password?
          </a>
        </div>
        {/* login btn */}
        <div className="w-full">
          <Button type="submit">Login </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
