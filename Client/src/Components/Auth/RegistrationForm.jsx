import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import  toast ,{Toaster} from "react-hot-toast";

const RegistrationForm = ({ setAction }) => {
  const notifyError = (message) => toast.error(message); //toast error function
  //Yup Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "enter a valid name")
      .required("Name is required")
      .trim()
      .test(
        "is-not-only-whitespace",
        "Field cannot be empty",
        (value) => value.trim() !== ""
      ),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test(
        "is-not-only-whitespace",
        "Field cannot be empty",
        (value) => value.trim() !== ""
      ),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(15, "Password must not exceed 15 characters")
      .test(
        "is-not-only-whitespace",
        "Field cannot be empty",
        (value) => value.trim() !== ""
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .test(
        "is-not-only-whitespace",
        "Field cannot be empty",
        (value) => value.trim() !== ""
      ),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required")
      .test(
        "is-not-only-whitespace",
        "Field cannot be empty",
        (value) => value.trim() !== ""
      ),
    address: Yup.string()
      .required("Address is required")
      .test(
        "is-not-only-whitespace",
        "Field cannot be empty",
        (value) => value.trim() !== ""
      ),
    agree: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });
// set  useFormic hook
  const formik = useFormik({
    // setting initail values
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      agree: false,
    },
    
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data} = await axios.post(
          import.meta.env.VITE_REGISTRATION_POST_URL,
          values,
          { withCredentials: true }
        );
        const { success, message, user } = data;
        if (success) {
          toast.success(message);
          setTimeout(() => {
            setAction("login"); // Switch to login modal
            console.log(user);
          }, 2000);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        notifyError("An error occurred. Please try again.");
      }
      resetForm();
    },
  });

  return (
    <>
      <form
        className="flex flex-col max-w-md gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Label htmlFor="name" value="Full Name" />
          <TextInput
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" value="Your email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" value="Your password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword" value="Confirm password" />
          <TextInput
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" value="Mobile" />
          <TextInput
            id="phone"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address" value="Address" />
          <TextInput
            id="address"
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500">{formik.errors.address}</p>
          )}
        </div>

        <div>
          <Checkbox
            id="agree"
            name="agree"
            className="me-2"
            checked={formik.values.agree}
            onChange={formik.handleChange}
          />
          <Label htmlFor="agree">
            I agree with the&nbsp;
            <a className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </a>
          </Label>
          {formik.touched.agree && formik.errors.agree && (
            <p className="text-sm text-red-500">{formik.errors.agree}</p>
          )}
        </div>

        <Button type="submit">
          Register new account
        </Button>
      </form>
      <Toaster />
    </>
  );
};

export default RegistrationForm;
