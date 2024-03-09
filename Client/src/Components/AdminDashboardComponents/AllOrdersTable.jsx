import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";

function AllOrdersTable() {
  const [salesData, setSalesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Number of orders per page

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_ALL_ORDERS_URL);
      const orders = response.data.orders;

      setSalesData(orders);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = salesData?.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-4 mx-4">
      <h1 className="text-center text-xl font-bold mb-2">Recent Orders</h1>
      <div className="overflow-x-auto shadow-md">
        <Table>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentOrders?.map((order, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {order?.orderList[0]?.product.name}
                </Table.Cell>
                <Table.Cell>{order?.orderList[0]?.quantity}</Table.Cell>
                <Table.Cell>{order.payment.amount}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded-l focus:outline-none focus:shadow-outline"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {salesData && (
          <div className="flex">
            {[...Array(Math.ceil(salesData.length / ordersPerPage))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`${
                    currentPage === index + 1
                      ? "bg-gray-400 text-white"
                      : "bg-white hover:bg-gray-100"
                  } font-bold py-2 px-4 rounded-sm outline-none focus:outline-none`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline "
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(salesData?.length / ordersPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllOrdersTable;
