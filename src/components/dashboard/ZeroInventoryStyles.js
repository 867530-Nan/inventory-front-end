import React from "react";
import PieChart from "../generic/PieChart"; // Make sure to adjust the path
import { useDashboardContext } from "../../contexts/DashboardContext";

const ZeroInventoryStyles = () => {
  const { zeroInventoryStyles } = useDashboardContext();

  return (
    <div
      style={{
        height: 400,
        width: 350,
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {zeroInventoryStyles?.map((sample) => (
          <li
            key={sample.style_id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <strong>Name:</strong> {sample.style_name}
            <br />
            <strong>Color:</strong> {sample.style_color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZeroInventoryStyles;
