import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import CategoryEditModal from "./CategoryEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import { useAuth } from "../../../Context/auth";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [auth] = useAuth();

  //getting all categories
  const getAllCategory = async () => {
    try {
      if (!auth?.user || !auth?.token) {
        return toast("auth required");
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
  // get all category -function call
  useEffect(() => {
    getAllCategory();
  }, [selected, name]);

  //hanadle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!auth?.user || !auth?.token) {
        return console.log("auth required");
      }

      const { data } = await axios.post(
        import.meta.env.VITE_CREATE_CATEGORY_URL,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in form submission");
    }
  };
  //update category
  const handleUpdate = async (updatedCategory) => {
    try {
      if (!auth?.user || !auth?.token) {
        return console.log("auth required");
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_UPDATE_CATEGORY_URL}/${selected._id}`,
        { name: updatedCategory }
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        setSelected(null);
        getAllCategory();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in updating category");
    }
  };
  //delete category
  const handleDelete = async () => {
    try {
      if (!auth?.user || !auth?.token) {
        return console.log("auth required");
      }
      const { data } = await axios.delete(
        `${import.meta.env.VITE_DELETE_CATEGORY_URL}/${selected._id}`
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        setSelected(null);
        getAllCategory();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in updating category");
    }
  };
  return (
    <div className="mb-10 ">
      <CategoryForm
        handleFormSubmit={handleFormSubmit}
        value={name}
        setValue={setName}
      />
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
          {categories
            ?.slice(0)
            .reverse()
            .map((category, index) => (
              <Table.Row
                key={category._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => setSelected(category)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <CategoryEditModal
                      name={category.name}
                      handleUpdate={handleUpdate}
                    />
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => setSelected(category)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    <CategoryDeleteModal handleDelete={handleDelete} />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Toaster />
    </div>
  );
}

export default CategoryManagement;
