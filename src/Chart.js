// src/components/Chart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the required components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Chart = ({ data }) => {
  // Check if data is provided and ensure it's an array
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  // Extract unique colors from the data
  const colorData = data?.map(product => product.data?.color || 'Unknown') // Use 'Unknown' for products without color
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
        label: 'Number of Products by Color',
        data: Object.values(colorCounts),
        backgroundColor: Object.keys(colorCounts).map(color => color || '#ddd') // Fallback color for 'Unknown'
      }
    ]
  };

  return (
    <div>
      <h2>Product Count by Color</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
