import axios from "axios";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../Context/auth";

function AddProductFormModal({ getAllProduct }) {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState();
  const [file, setFile] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [auth] = useAuth();
  const [data, setData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    file: "",
    category: "",
  });
  const [input, setInput] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
  });
  //close modal
  function onCloseModal() {
    setOpenModal(false);
  }
  //handle file change
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFile(Array.from(selectedFiles));

    // Generate preview images
    const imagePreviews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(imagePreviews);
  };
  //getting all categories
  const getAllCategory = async () => {
    try {
      if (!auth?.user || !auth?.token) {
        onCloseModal();
        return console.log("auth required");
      }
      const { data } = await axios.get(import.meta.env.VITE_GET_CATEGORY_URL);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // get all category -function
  useEffect(() => {
    getAllCategory();
  }, [openModal]);

  //handlechange
  function handleChange(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      file.forEach((file) => {
        formdata.append("file", file);
      });
      formdata.append("name", input.name);
      formdata.append("price", input.price);
      formdata.append("description", input.description);
      formdata.append("quantity", input.quantity);
      formdata.append("category", input.category);
      const { data } = await axios.post(
        import.meta.env.VITE_Add_PRODUCT_URL,
        formdata
      );
      if (data.success) {
        onCloseModal();
        getAllProduct();
        // toast.success(data.message)
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      onCloseModal();
      getAllProduct();
      console.log(error);
      toast.error("error in create product");
    }
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="  ms-4 bg-[blue]  p-2 rounded-md text-white"
      >
        Add Product
      </button>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              {/* dropdown category*/}
              <div className="my-3 flex items-center justify-between">
                <Label className="text-md"> Select Product Category : </Label>
                <select
                  className="rounded-xl"
                  name="category"
                  value={input.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* choose file */}
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="my-10"
              />
              {/* preview */}
              {previewImages.map((previewUrl, index) => (
                <img
                  key={index}
                  src={previewUrl}
                  alt={`Preview ${index + 1}`}
                  style={{
                    display: "flex",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginTop: "40px",
                  }}
                />
              ))}

              {/* enter product name */}
              <div className="my-2  block">
                <Label htmlFor="" value="Product Name" />
              </div>
              <TextInput
                required
                shadow
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            {/* text area description */}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Product Description" />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>
            {/* price */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Product price" />
              </div>
              <TextInput
                type="number"
                name="price"
                value={input.price}
                onChange={handleChange}
                required
                shadow
              />
            </div>
            {/* quantity */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="product quantity" />
              </div>
              <TextInput
                type="number"
                name="quantity"
                value={input.quantity}
                onChange={handleChange}
                required
                shadow
              />
            </div>
            <Button type="submit" color="blue">
              Add new Product
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default AddProductFormModal;
