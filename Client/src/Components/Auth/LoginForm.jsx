import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Context/auth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = ({ onCloseModal }) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // toast message funcs
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  //validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_LOGIN_POST_URL,
          values,
          { withCredentials: true }
        );
        const { success, message, user, token } = response.data;
        if (success) {
          notifySuccess(message);

          setTimeout(() => {
            onCloseModal(); // Close modal
            //  if user try to access  privte route 
            location.state && navigate(location.state)
            //set user and token
            setAuth({
              ...auth,
              user: user,
              token: token,
            });
            localStorage.setItem("auth", JSON.stringify(response.data));
            console.log(user, token);
          }, 1000);
        } else {
          notifyError(message);
        }
      } catch (error) {
        console.log("Login error:", error);
        notifyError("An error occurred. Please try again.");
      }
      resetForm();
    },
  });

  return (
    <>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign in
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-3">
          <div className="block mb-2">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            name="email"
            placeholder="name@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 py-3">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <a className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
            Lost Password?
          </a>
        </div>
        <div className="w-full">
          <Button type="submit">Login</Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
