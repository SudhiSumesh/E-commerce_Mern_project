import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Label, Modal, ModalBody, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Context/auth";
import { useNavigate } from "react-router-dom";

const UpdateProfileModal = ({ }) => {
  const [openModal, setOpenModal] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate()
  function onCloseModal() {
    setOpenModal(false);
  }
  const notifyError = (message) => toast.error(message); //toast error function
  //Yup Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "enter a valid name")
      .required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone Number  is required"),
    address: Yup.string().required("Address is required"),
  });
  // set  useFormic hook
  const formik = useFormik({
    // setting initail values
    initialValues: {
      name: auth?.user?.name || "",
      phone: auth?.user?.phone || "",
      address: auth?.user?.address || "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_PROFITE_PUT_URL}/${auth?.user?.userId}`,
          values,
            { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          setAuth({ ...auth, user: data?.updateduser });
          toast.success(message);
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user=data?.updateduser
          localStorage.setItem("auth", JSON.stringify(ls));
            onCloseModal()
            navigate('/')
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("updation error:", error);
        notifyError("An error occurred. Please try again.");
      }
      resetForm();
    },
  });

  return (
    <>
      <div
        className="  rounded-lg self-center hover:underline hover:text-[blue] cursor-pointer transition-all duration-700"
        onClick={() => setOpenModal(true)}
      >
        Update Profile
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header></Modal.Header>
        <ModalBody>
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
            <button
              type="submit"
              className="bg-[blue] p-3 rounded-md text-white"
            >
              Update
            </button>
          </form>
        </ModalBody>
        <ToastContainer />
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
