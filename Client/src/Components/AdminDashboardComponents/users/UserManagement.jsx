import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
function UserManagement() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUser();
  }, []);
  //get all user
  const getAllUser = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_GET_ALL_USER_URL);
      if (data.success) {
        setUsers(data.users);
        console.log(users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="  ps-10 py-3">
      <Table hoverable className=" border m-4 ">
        <Table.Head>
          <Table.HeadCell>Sl No</Table.HeadCell>
          <Table.HeadCell> User Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone No </Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Block</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user, index) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phone}</Table.Cell>
              <Table.Cell>{user.address}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default UserManagement;
