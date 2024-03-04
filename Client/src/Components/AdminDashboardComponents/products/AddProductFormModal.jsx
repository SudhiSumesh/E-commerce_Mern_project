import axios from "axios";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/auth";
import toast,{ Toaster } from "react-hot-toast";
function AddProductFormModal({ getAllProduct }) {
  const [openModal, setOpenModal] = useState(false);
  const [error,setError]=useState({})
  const [categories, setCategories] = useState();
  const [file, setFile] = useState([]);
  
  const [previewImages, setPreviewImages] = useState([]);
  const [auth] = useAuth();
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
      if(input.name.trim()===""){
        return setError({...error,nameError:"name is required"})
      }
        if (input.description.trim() === "") {
          return setError({ ...error, descriptionError: "description is required" });
        }
          if (input.price.trim() <= 0) {
            return setError({ ...error, priceError: "price is must be positive number" });
          }
            if (input.quantity.trim() <= 0) {
              return setError({
                ...error,
                quantityError: "quantity  is must be positive number",
              });
            }
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
        toast.success(data.message)
      
      } else {
        console.log(data.message);
         toast.error(data.message);
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
                  required
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
                name=""
                required
                className="my-10"
              />
              {/* preview */}
              <div className="flex justify-between items-center ">
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
              </div>

              {/* enter product name */}
              <div className="my-2  block">
                <Label htmlFor="" value="Product Name" />
              </div>
              <TextInput
                // required
                shadow
                name="name"
                value={input.name}
                onChange={handleChange}
              />
              {error?.nameError ? (
                <span className="text-[red]">{error.nameError}</span>
              ) : (
                ""
              )}
            </div>
            {/* text area description */}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Product Description" />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                // required
                rows={4}
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>
            {error?.descriptionError ? (
              <span className="text-[red]">{error.descriptionError}</span>
            ) : (
              ""
            )}

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
            {error?.priceError ? (
              <span className="text-[red]">{error.priceError}</span>
            ) : (
              ""
            )}

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
            {error?.quantityError ? (
              <span className="text-[red]">{error.quantityError}</span>
            ) : (
              ""
            )}

            <Button type="submit" color="blue">
              Add new Product
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <Toaster />
    </>
  );
}

export default AddProductFormModal;


