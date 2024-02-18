 const  validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "enter a valid name").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must not exceed 15 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  agree: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

  const LoginvalidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
export default {LoginvalidationSchema,validationSchema}