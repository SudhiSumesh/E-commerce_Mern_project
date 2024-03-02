import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast,{ Toaster  } from "react-hot-toast";

function ForgotPassword({}) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_FORGOT_PASSWORD_URL,
        { email }
      );
      if (data.success) {
        toast.success(data.message);

        setTimeout(() => {
          navigate("/reset-password");
        }, 100);
        console.log(data.message);
      } else {
        console.log("error in data.success");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error(error.response.data.message || "error in forgot password");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <h1 className="w-full text-center my-10 text-3xl">
           Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border rounded-md p-10 shadow-md"
        >
          <div className="p-10 flex flex-col justify-center items-start">
            <label htmlFor="email" value="Your email" />

            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="border rounded-md border-[#1817178f]  py-3 px-1 text-xl"
              value={email}
              placeholder="name@gmail.com"
              required
            />
            {/* {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p> */}
            {/* )} */}
            <button
              className="bg-[blue] px-3 py-1.5 rounded-md text-white my-4 "
              type="submit"
            >
              Forgot password
            </button>
          </div>
        </form>
        <Link to="/" className="bg-[blue] text-white px-4 rounded-md my-6 py-2">
          Go to Home
        </Link>
        <Toaster />
      </div>
    </>
  );
}

export default ForgotPassword;
