import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Analytics.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  // State to store chart data and table data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Kudos Received",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch kudos count from API
    fetch("http://localhost:5000/api/kudosCount")
      .then((response) => response.json())
      .then((data) => {
        // Extract labels (names) and data (kudos counts) for the chart
        const labels = data.map((item) => item.recipientDetails.name);
        const kudosData = data.map((item) => item.totalCount);

        // Generate colors for the chart
        const backgroundColors = labels.map((_, index) => {
          const colors = [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ];
          return colors[index % colors.length];
        });

        const borderColors = labels.map((_, index) => {
          const colors = [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 99, 132, 1)",
          ];
          return colors[index % colors.length];
        });

        // Update chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Kudos Received",
              data: kudosData,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });

        // Update table data
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error fetching kudos count:", error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Kudos Analytics",
      },
    },
    scales: {
      x: {
        // Adjust this to control the width of the bars
        barPercentage: 1,   // Adjust this to control the width relative to the available space
        categoryPercentage: 1,  // Adjust this to control the space between bars
        ticks: {
          // Make sure this does not affect bar width
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        // Setting the width of bars
        // This will scale the bars to the defined width
        barThickness: 100,  // Approximate width of bars
        maxBarThickness: 100,  // Maximum width of bars
      },
    },
  };
  

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <div className="chart-container">
        <Bar data={chartData} options={options} />

        <table className="table table-bordered" border="1" align="center">
          <thead align="center">
            <tr>
              <th>Name</th>
              <th>Number Of Kudos Received</th>
            </tr>
          </thead>
          <tbody align="center">
            {tableData.map((item) => (
              <tr key={item._id}>
                <td>{item.recipientDetails.name}</td>
                <td>{item.totalCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
