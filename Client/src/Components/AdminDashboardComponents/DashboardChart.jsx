// import React, { useEffect, useState } from "react";
// import Chart from "chart.js/auto";
// import axios from "axios";

// function DashboardChart() {
//   const [salesData, setSalesData] = useState(null);

//   useEffect(() => {
//     fetchSalesData();
//   }, []);

//   const fetchSalesData = async () => {
//     try {
//       const response = await axios.get(import.meta.env.VITE_GET_ALL_ORDERS_URL); // Update the API endpoint accordingly
//       const orders = response.data.orders;

//       // Prepare data for the bubble chart
//       const data = orders.map((order) => ({
//         x: order.payment.amount, // Revenue (amount)
//         y: order.orderList.reduce((total, item) => total + item.quantity, 0), // Total quantity of products in the order
//         r: 10, // Bubble size
//       }));

//       setSalesData(data);
//     } catch (error) {
//       console.error("Error fetching sales data:", error);
//     }
//   };

//   useEffect(() => {
//     if (salesData) {
//       renderChart();
//     }
//   }, [salesData]);

//   const renderChart = () => {
//     const ctx = document.getElementById("bubbleChart");

//     new Chart(ctx, {
//       type: "bubble",
//       data: {
//         datasets: [
//           {
//             label: "Sales",
//             data: salesData,
//             backgroundColor: "rgba(75, 192, 192, 0.6)", // Adjust color as needed
//             borderColor: "rgba(75, 192, 192, 1)",
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             title: {
//               display: true,
//               text: "Quantity", // Y-axis label
//             },
//           },
//           x: {
//             title: {
//               display: true,
//               text: "Revenue", // X-axis label
//             },
//           },
//         },
//       },
//     });
//   };

//   return (
//     <div className="flex flex-row items-center">
//       <canvas id="bubbleChart" width="400" height="400"></canvas>
//     </div>
//   );
// }

// export default DashboardChart;



import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

function DashboardChart() {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_ALL_ORDERS_URL); // Update the API endpoint accordingly
      const orders = response.data.orders;

      // Prepare data for the bubble chart
      const data = orders.map((order) => ({
        x: order.payment.amount, // Revenue (amount)
        y: order.orderList.reduce((total, item) => total + item.quantity, 0), // Total quantity of products in the order
        r: 10, // Bubble size
      }));

      setSalesData(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    if (salesData) {
      renderChart();
    }
  }, [salesData]);

  const renderChart = () => {
    const ctx = document.getElementById("bubbleChart");

    new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: salesData.map(
              () =>
                `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 0.6)`
            ), // Generate random colors for bubbles
            borderColor: salesData.map(
              () =>
                `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 1)`
            ), // Generate random colors for bubble borders
          },
        ],
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: "Quantity", // Y-axis label
            },
          },
          x: {
            title: {
              display: true,
              text: "Revenue", // X-axis label
            },
          },
        },
      },
    });
  };

  const getRandomColor = () => {
    return Math.floor(Math.random() * 256);
  };

  return (
    <div className="flex flex-row items-center">
      <canvas
        id="bubbleChart"
        width="400"
        height="400"
        
      ></canvas>
    </div>
  );
}

export default DashboardChart;
