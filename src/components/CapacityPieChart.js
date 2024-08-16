// src/components/CapacityPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CapacityPieChart = ({ products }) => {
  // Check if products are provided and ensure it's an array
  if (!products || !Array.isArray(products)) {
    return <div>No data available</div>;
  }

  // Extract unique colors from the products
  const colorData = products?.map(product => product.data?.color || 'Unknown') // Use 'Unknown' for products without color
    .filter(Boolean);

  // Count occurrences of each color
  const colorCounts = colorData.reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});

  // Define chart data
  const chartData = {
    labels: Object.keys(colorCounts),
    datasets: [
      {
        data: Object.values(colorCounts),
        backgroundColor: Object.keys(colorCounts).map(color => color || '#ddd') // Fallback color for 'Unknown'
      }
    ]
  };

  return (
    <div>
      <h2>Product Distribution by Color</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CapacityPieChart;
