import React from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
function UserManagement() {
  return (
    <div className="overflow-x-auto  ps-10 py-3">
      <Table hoverable className=" border m-4 ">
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>{" "}
          <Table.HeadCell>
            <span className="sr-only">Block</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
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
                Block
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
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
                Block
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
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
                Block
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
        </Table.Body>
      </Table>
    </div>
  );
}

export default UserManagement;
