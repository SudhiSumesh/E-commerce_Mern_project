import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

function CategoryEditModal({ name, handleUpdate }) {
  const [openModal, setOpenModal] = useState(false);
  const [category, setName] = useState(name);

  function onCloseModal() {
    setOpenModal(false);
  }
//when clicking update button
const handleClick=()=>{
  handleUpdate(category)
  onCloseModal()
}
  return (
    <>
      <button
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        onClick={() => setOpenModal(true)}
      >
        Edit
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Category Name
            </h3>
            <div>
              <TextInput
                value={category}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <Button onClick={handleClick} type="submit" color="blue" className="my-2 ">
                Update Category
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryEditModal;