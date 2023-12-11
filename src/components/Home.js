import React from "react";
import MostPopularStyles from "./dashboard/MostPopularStyles";
import ZeroInventoryStyles from "./dashboard/ZeroInventoryStyles";
import { useDashboardContext } from "../contexts/DashboardContext";

const Dashboard = () => {
  const { totalOrdersCount, totalNoCheckedOutSamples } = useDashboardContext();
  const stats = [
    { title: "Samples Checked Out", value: totalNoCheckedOutSamples },
    { title: "Current Orders", value: totalOrdersCount },
    { title: "Zero Inventory Samples", component: <ZeroInventoryStyles /> },
    {
      title: "Most Popular Sample",
      component: <MostPopularStyles />,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-lg font-bold mb-2">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
            {stat.component ? stat.component : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
