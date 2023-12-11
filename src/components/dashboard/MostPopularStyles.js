import React from "react";
import PieChart from "../generic/PieChart"; // Make sure to adjust the path
import { useDashboardContext } from "../../contexts/DashboardContext";

const MostPopularStyles = () => {
  const { mostPopularStyles } = useDashboardContext();

  console.log("mostPopularStyles", mostPopularStyles);
  const labels = mostPopularStyles?.map(
    (item) => `${item.style_name}: ${item.style_color}`,
  );
  const dataSet = mostPopularStyles?.map((item) => item.qr_count);

  return (
    <div style={{ height: 400, width: 350 }}>
      <PieChart dataSet={dataSet} labels={labels} tooltipLabel="Style Name: " />
    </div>
  );
};

export default MostPopularStyles;
