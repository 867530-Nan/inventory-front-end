import React, { useState } from "react";
import GenericTable from "../generic/GenericTable";
import { useStylesContext } from "../../contexts/StylesContext";

const Dashboard = ({ onRowClick }) => {
  const { styles, filterStylesByName, filterStylesByColor } =
    useStylesContext();
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    setFilterValue(""); // Reset filter value when switching filter type
  };

  const handleFilterValueChange = (value) => {
    setFilterValue(value);
  };

  const filteredData =
    filterType === "name"
      ? filterStylesByName(filterValue)
      : filterStylesByColor(filterValue);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Styles Dashboard</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="radio"
            value="name"
            checked={filterType === "name"}
            onChange={() => handleFilterTypeChange("name")}
          />
          Filter by Name
        </label>
        <label>
          <input
            type="radio"
            value="color"
            checked={filterType === "color"}
            onChange={() => handleFilterTypeChange("color")}
          />
          Filter by Color
        </label>
        <input
          type="text"
          value={filterValue}
          placeholder={filterType === "color" ? "Color" : "Name"}
          onChange={(e) => handleFilterValueChange(e.target.value)}
        />
      </div>
      <div style={{ width: "600px" }}>
        <GenericTable
          onRowClick={onRowClick}
          data={filteredData}
          columns={[
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Color",
              accessor: "color",
            },
            {
              Header: "Inventory",
              accessor: "inventory",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
