import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function CategoryDeleteModal({ handleDelete }) {
  const [openModal, setOpenModal] = useState(false);
  //handle delete btn click
  const handleClick = () => {
    handleDelete();
    setOpenModal(false);
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
              Are you sure you want to delete this Category?
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

export default CategoryDeleteModal;
