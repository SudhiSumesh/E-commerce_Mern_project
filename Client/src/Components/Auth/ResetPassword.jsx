import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function ResetPassword() {
  const [inputValues, setInputValues] = useState({
    otp: "",
    password: "",
  });
  const navigate = useNavigate();
  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  // console.log(inputValues);
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, otp } = inputValues;
    try {
      const { data } = await axios.put(
        import.meta.env.VITE_RESET_PASSWORD_URL,
        {
          password,
          otp,
        }
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        navigate("/");
      } else {
        toast.error("incorrect otp");
        console.log(data.message);
      }
    } catch (error) {
      toast.error("error in reset password");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <h1 className="w-full text-center my-10 text-3xl">
          Reset Your Password
        </h1>
        <form
          className="border rounded-md p-10 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="px-1">
            <div className="flex flex-col mb-2 ">
              <label htmlFor="email" className="">
                Enter OTP
              </label>
              <input
                type="number"
                name="otp"
                onChange={handleChange}
                value={inputValues.otp}
                className="border rounded-md border-[#1817178f]  py-3 px-1 text-xl"
                required
              />
            </div>
            <div className="flex my-4 flex-col">
              <label htmlFor="resetPassword">New Password</label>
              <input
                name="password"
                value={inputValues.password}
                onChange={handleChange}
                className="border rounded-md border-[#1817178f] px-1 w-[350px] py-3 text-xl"
                required
              />
            </div>
          </div>
          <div className="w-full my-2">
            <button
              className="bg-[blue] px-3 py-1.5 rounded-md text-white"
              type="submit"
            >
              Reset password
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
}

export default ResetPassword;
