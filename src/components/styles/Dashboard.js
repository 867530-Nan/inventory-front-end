import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { serverEndpointSwitch } from "../../utils/common";

const Dashboard = ({ onRowClick }) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [checkouts, setCheckouts] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    // Fetch styles on component mount
    const fetchStyles = async () => {
      try {
        const response = await axios.get(
          `${serverEndpointSwitch}/api/v1/styles/dashboard-info`,
        );
        setStyles(response.data);
      } catch (error) {
        console.error("Error fetching styles:", error);
      }
    };

    fetchStyles();
  }, []);

  const headers = [
    "ID",
    "Name",
    "Color",
    "Texture",
    "Price",
    "Inventory",
    // "Image URL",
    "Checkout Count",
  ];
  const handleRowClick = (id) => {
    onRowClick(id);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Styles Dashboard</h1>
      <table className="min-w-full border border-collapse border-gray-800">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="bg-gray-800 text-white py-2 px-4 border border-gray-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {styles.map((style) => (
            <tr
              key={style.id}
              className="border border-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => handleRowClick(style.id)}
            >
              <td className="py-2 px-4">{style.id}</td>
              <td className="py-2 px-4">{style.name}</td>
              <td className="py-2 px-4">{style.color}</td>
              <td className="py-2 px-4">{style.texture}</td>
              <td className="py-2 px-4">{style.price}</td>
              <td className="py-2 px-4">{style.inventory}</td>
              <td className="py-2 px-4">{style.checkout_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
