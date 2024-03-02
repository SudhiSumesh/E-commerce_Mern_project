import axios from "axios";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../../Context/auth";

function EditProductModal({product, getAllProduct}) {
  const [auth]=useAuth()
  const [openModal, setOpenModal] = useState(false);
    // const [previewImages, setPreviewImages] = useState([]);
  const [categories, setCategories] = useState();
  // const [produ,setProduct]=useState(product)
  //close modal

  function onCloseModal() {
    setOpenModal(false);
  }
  //getting all categories
  const getAllCategory = async () => {
    try {
      if(!auth.user || !auth.token){
        onCloseModal()
        return  console.log("Auth required");
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
  }, []);

  // set  useFormic hook
  const formik = useFormik(
{
    // setting initail values
    
    initialValues: {
      name: product?.name || "" ,
      description: product?.description || "" ,
      category: product?.category._id || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
            if (!auth?.user || !auth?.token) {
              onCloseModal();
              return console.log("auth required");
            }
        // update category
        const { data } = await axios.put(
          `${import.meta.env.VITE_UPDATE_PRODUCT_URL}/${product._id}`,
          {...values},
          { withCredentials: true }
        );
        if (data?.success) {
          // toast.success("product added successfully");
          // console.log(data.message);
          onCloseModal();
           getAllProduct();
            getAllCategory();
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error in updating product:", error);
        toast.error("An error occurred. Please try again.");
      }
      resetForm();
    },
  });
  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
          // console.log(auth.user,auth.token);
        }}
        className="  text-[blue] hover:underline rounded-lg"
      >
        Edit
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
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* choose file */}
              {/* <input
                type="file"
                onChange={handleFileChange}
                multiple
                name=""
                className="my-10"
              />
              {/* preview */}
              {/* <div className="flex justify-between items-center ">
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
              </div> */} 
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
            <Button type="submit" color="blue" >
              Update Product
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <Toaster />
    </>
  );
}

export default EditProductModal;

