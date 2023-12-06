import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Placeholder data (replace with actual data)
  const stats = [
    { title: "Samples at Inventory 0", value: 150 },
    { title: "Most Popular Sample", value: "Sample A" },
    { title: "Samples Checked Out", value: 120 },
    { title: "Current Orders", value: 10 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={`/${stat.title.toLowerCase().replace(/\s/g, "-")}`}
            className="bg-white p-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-lg font-bold mb-2">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
