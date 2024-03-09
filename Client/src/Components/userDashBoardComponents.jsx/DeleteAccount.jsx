import { Label, Textarea, Button, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/auth";
function DeleteAccount() {
  const [auth] = useAuth();
  console.log(auth);
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    setReason(e.target.value);
  };
  useEffect(() => {
    getDeleteRequestStatus();
  }, [openModal]);
  const HandleSubmit = async () => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_USER_DELETE_REQUEST_URL,
        { reason }
      );
      if (data.success) {
        toast.success(data.message);
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("error in send request .try later");
    }
  };

  //get delete req status
  const getDeleteRequestStatus = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_USER_DELETE_REQUEST_STATUS_URL
      );
      if (data.success) {
        setStatus(data.status);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in getting request status");
    }
  };
  return (
    <div className="flex justify-center items-center   mt-4 p-4 ">
      {status === "not requested" || status === "rejected" ? (
        <div className="my-4">
          {/* form sec */}
          <div className=" inline text-xl  py-2 text-[#ee9a1d] rounded-md">
            {status === "rejected" ? ` Your request ${status} by admin ` : ""}
          </div>
          <div className="">
            <h1 className="text-3xl mb-3">Delete Your Account</h1>
            <div>
              Are you sure? Your profile and related account information will be
              deleted from our site.
            </div>
            <div className="my-4 block">
              <Label
                htmlFor="comment"
                value="Write the reason for deleting your account"
                className="text-xl"
              />
            </div>
            <Textarea
              placeholder="Write The reason for deleting your account..."
              required
              rows={4}
              onChange={handleChange}
            />
          </div>

          {/* confirm modal */}
          <button
            onClick={() => {
              if (reason.trim() === "") {
                return toast.error("valid reason is required");
              }
              setOpenModal(true);
            }}
            className="my-4 bg-[blue] p-3 text-white rounded-md"
          >
            Request To Delete Account
          </button>
          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure to make a delete request
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={HandleSubmit}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div className=" inline text-xl  p-2 text-[#ee9a1d] rounded-md">
          {` Your request ${status}, need approvel from admin to delete your account`}
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default DeleteAccount;
