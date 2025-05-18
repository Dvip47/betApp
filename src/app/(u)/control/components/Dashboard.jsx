"use client";

import React, { useState } from "react";
// Import Chart.js components and register them
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the components required for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);


  const pieChartData = {
    labels: ["Cricket", "Tennis", "Soccer", "Casino"],
    datasets: [
      {
        label: "Profits",
        data: [300, 200, 150, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const backupSportProfit = {
    labels: [],
    datasets: [
      {
        label: "Profits",
        data: [100],
        backgroundColor: [
          "rgba(0, 0, 0, 0.1)",

        ],
      },
    ],
  };

  return (
    <div className="text-black m-1">
      <div className="grid grid-cols-2 gap-4"> {/* Create two columns */}

        {/* Column 1: Pie Chart */}
        <div className="col-span-1 flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex items-center justify-start">
              <h2 className="text-xl font-bold mb-4">Live Sports Profit</h2>
            </div>
            <div className="w-[400px] h-[400px]">
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>


        {/* Column 2: Profits Details */}
        <div className="col-span-1 flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex items-center justify-start">
              <h2 className="text-xl font-bold mb-4">Backup SPorts Profit</h2>
            </div>
            <div className="w-[400px] h-[400px]">
              <Pie data={backupSportProfit} />
            </div>
          </div>
        </div>


      </div>

      {/* <HomeUserTableComponent
        refresh={refresh}
        setRefresh={setRefresh}
        actions={true}
        controlSent={true}
      /> */}
    </div>
  );
};

export default Dashboard;
