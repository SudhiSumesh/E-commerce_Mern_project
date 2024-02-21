import axios from "axios";
import {
  Button,
  Dropdown,
  FileInput,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddProductFormModal() {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState();
  //close modal
  function onCloseModal() {
    setOpenModal(false);
  }
  //getting all categories
  const getAllCategory = async () => {
    try {
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
  }, []);
  // set  useFormic hook
  const formik = useFormik({
    // setting initail values
    initialValues: {
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
       
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_Add_PRODUCT_URL,
          values,
          // { withCredentials: true }
        );
        if(data?.success){
            toast.success("product added successfully")
            console.log(data.message)
            onCloseModal()
            getAllCategory();
        }
        else{
            toast.error(data.message)
            console.log(data.message)
        }
      } catch (error) {
        console.log("Error in product adding:", error);
        toast.error("An error occurred. Please try again.");
      }
      resetForm();
    },
  });
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
            onSubmit={formik.handleSubmit}
          >
            <div>
              {/* dropdown category*/}
              <div className="my-3 flex items-center justify-between">
                <Label className="text-md"> Select Product Category : </Label>
                <select
                  className="rounded-xl"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
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
              {/* <div>
                <div className="my-2 ">
                  <Label
                    htmlFor="file-upload-helper-text"
                    value="Upload product image"
                  />
                </div>
                <FileInput
                  type="file"
                  className=""
                  //   helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                />
              </div> */}
              {/* enter product name */}
              <div className="my-2  block">
                <Label htmlFor="" value="Product Name" />
              </div>
              <TextInput
                required
                shadow
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
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
                value={formik.values.description}
                onChange={formik.handleChange}
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
                value={formik.values.price}
                onChange={formik.handleChange}
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
                value={formik.values.quantity}
                onChange={formik.handleChange}
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
    </>
  );
}

export default AddProductFormModal;