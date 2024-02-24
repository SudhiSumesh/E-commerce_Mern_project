

import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/auth";

function ProductDeleteModal({ productId, getAllProduct }) {
  const [openModal, setOpenModal] = useState(false);
  const [auth,setAuth]=useAuth()
  //handle delete btn click
  const handleClick =async () => {
    try {
          if (!auth?.user || !auth?.token) {
            onCloseModal();
            return console.log("auth required");
          }
     const { data } = await axios.delete(`${import.meta.env.VITE_DELETE_PRODUCT_URL}/${productId}`);
     if(data.success){
      console.log(data.message);
      toast.success(data.message)
      getAllProduct()
      setOpenModal(false);
       
    }else{
      toast.error(data.message)
      console.log(data.message);
     }
      
    } catch (error) {
      console.log(error);
      toast.error("errror in deleting product")
    }
  };
  return (
    <>
      <button
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        onClick={() => setOpenModal(true)}
      >
        Delete
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
              Are you sure you want to delete this Product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleClick}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductDeleteModal;
