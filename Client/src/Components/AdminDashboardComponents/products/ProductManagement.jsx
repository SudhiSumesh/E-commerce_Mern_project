import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import AddProductFormModal from "./AddProductFormModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditProductModal from "./EditProducModal";
import ProductDeleteModal from "./ProductDeleteModal";
import { useAuth } from "../../../Context/auth";

 function ProductManagement() {
  const [products, setProducts] = useState([]);

  const [auth] = useAuth();
  //get all products
  const getAllProduct = async () => {
    try {
      //  getAllCategory();
      if (!auth?.user || !auth?.token) {
        // onCloseModal();
        return console.log("auth required");
      }
      const { data } = await axios.get(import.meta.env.VITE_GET_PRODUCT_URL);
      if (data?.success) {
        setProducts(data.products);
        console.log(products);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in getting product list");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="  ps-10 py-3">
        <div>
          <AddProductFormModal getAllProduct={getAllProduct} />
        </div>
        <Table hoverable className=" border m-4 ">
          <Table.Head>
            <Table.HeadCell>Sl.No</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell className="text-center">Image</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products?.reverse().map((product, i) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{product.category.name}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </Table.Cell>
                <Table.Cell>
                  <img
                    crossorigin=""
                    src={`http://localhost:4000/images/${product.imageOne}`}
                    alt="productimage"
                    width="110px"
                    height="110px"
                  />
                </Table.Cell>
                <Table.Cell className="max-w-[300px]">
                  {product.description}
                </Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
                <Table.Cell>
                  <button className="font-medium text-[blue] hover:underline dark:[blue]">
                    <EditProductModal
                      product={product}
                      getAllProduct={getAllProduct}
                    />
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <ProductDeleteModal
                      productId={product._id}
                      getAllProduct={getAllProduct}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <ToastContainer />
      </div>
    </>
  );
}

export default ProductManagement;

