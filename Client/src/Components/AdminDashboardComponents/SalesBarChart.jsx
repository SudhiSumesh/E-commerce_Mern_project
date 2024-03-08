import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const SalesDoughnutChart = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_ALL_ORDERS_URL); // Update the API endpoint accordingly
      const orders = response.data.orders;

      // Aggregate sales data by category
      const salesByCategory = {};

      orders?.forEach((order) => {
        order.orderList.forEach(({ product, quantity }) => {
          const category = product?.category?.name || "Xiomi";
          salesByCategory[category] =
            (salesByCategory[category] || 0) + quantity;
        });
      });

      // Prepare data for the doughnut chart
      const labels = Object.keys(salesByCategory);
      const data = Object.values(salesByCategory);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Sales by Category",
            backgroundColor: [
              "#36A2EB", // Red
              "Violet", // Blue
              "#FFCE56", // Yellow
              "#4BC0C0", // Green
              "#9966FF", // Purple
              "#FF9F40", // Orange
              "#00ADB5", // Teal
              "#F6416C", // Pink
              "#625772", // Lavender
              "#6D214F", // Maroon
            ].slice(0, labels.length), // Ensure there are enough colors for all categories
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#00ADB5",
              "#F6416C",
              "#625772",
              "#6D214F",
            ].slice(0, labels.length),
            data: data,
          },
        ],
      };

      setSalesData(chartData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  return (
    <div className="rounded-md " style={{ maxWidth: "300px" }}>
      <h1 className="ms-2 mt-4 text-xl underline text-[#0000ff8a] font-bold">Sales By Category</h1>
      {salesData && <Doughnut data={salesData} className="mt-4 py-2" />}
    </div>
  );
};

export default SalesDoughnutChart;
