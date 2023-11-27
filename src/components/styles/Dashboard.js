import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import GenericTable from "../generic/GenericTable";
import { useStylesContext } from "../../contexts/StylesContext";

const Dashboard = ({ onRowClick }) => {
  const {
    uniqueStyleNamesWithColors,
    styles,
    filterStylesByName,
    filterStylesByColor,
  } = useStylesContext();
  const [nameFilter, setNameFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");

  const filteredByName = filterStylesByName(nameFilter);

  const filteredByColor = filterStylesByColor(colorFilter);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ marginRight: "10px" }}>
            <label htmlFor="nameFilter">Filter by Name:</label>
            <input
              type="text"
              id="nameFilter"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "300px" }}>
          <GenericTable
            onRowClick={onRowClick}
            data={nameFilter.length ? filteredByName : styles}
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Color",
                accessor: "color",
              },
            ]}
          />
        </div>
      </div>
      <div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ marginRight: "10px" }}>
            <label htmlFor="colorFilter">Filter by Color:</label>
            <input
              type="text"
              id="nameFilter"
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "300px" }}>
          <GenericTable
            onRowClick={onRowClick}
            data={colorFilter.length ? filteredByColor : styles}
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Color",
                accessor: "color",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
