import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "./adminForms/CategoryForm";
import { date } from "yup";
function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
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

  //hnadle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_CREATE_CATEGORY_URL,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in form submission");
    }
  };
  return (
    <div className="mb-10 ">
      <CategoryForm
        handleFormSubmit={handleFormSubmit}
        value={name}
        setValue={setName}
      />{" "}
      {/* category form */}
      <Table hoverable className=" border my-4  ">
        <Table.Head>
          <Table.HeadCell>Sl.No</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {categories?.map((category, index) => (
            <Table.Row
              key={category._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>
                <Link
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Delete
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default CategoryManagement;
