import React, { useState } from "react";
import GenericTable from "../generic/GenericTable";
import { useOrders } from "../../contexts/OrdersContext";
import moment from "moment";

const OrdersDashboard = ({ onRowClick }) => {
  const { filterOrdersByName, filterOrdersByEmail } = useOrders();
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [filterOption, setFilterOption] = useState("name"); // Default to filtering by name

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const filteredData =
    filterOption === "name"
      ? filterOrdersByName(nameFilter)
      : filterOrdersByEmail(emailFilter);

  const formattedDate = (date) => moment(date).format("MM/DD/YYYY");

  return (
    <div className="flex flex-col">
      <h2 className="my-2">Orders Dashboard</h2>
      <div style={{ display: "flex" }}>
        <div>
          <div className="mb-5 flex">
            <label>
              <input
                type="radio"
                name="filterOption"
                value="name"
                checked={filterOption === "name"}
                onChange={() => handleFilterChange("name")}
              />
              Filter by Name
            </label>
            <label>
              <input
                type="radio"
                name="filterOption"
                value="email"
                checked={filterOption === "email"}
                onChange={() => handleFilterChange("email")}
              />
              Filter by Email
            </label>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ marginRight: "10px" }}>
              <input
                type="text"
                placeholder={filterOption === "name" ? "Name" : "Email"}
                id={filterOption === "name" ? "nameFilter" : "emailFilter"}
                value={filterOption === "name" ? nameFilter : emailFilter}
                onChange={(e) =>
                  filterOption === "name"
                    ? setNameFilter(e.target.value)
                    : setEmailFilter(e.target.value)
                }
              />
            </div>
          </div>
          <div style={{ width: "600px" }}>
            <GenericTable
              onRowClick={onRowClick}
              data={filteredData.map((order) => ({
                ...order,
                checkout_date: formattedDate(order.checkout_date),
              }))}
              columns={[
                {
                  Header: "Name",
                  accessor: "customer_name",
                },
                {
                  Header: "Email",
                  accessor: "customer_email",
                },
                {
                  Header: "Checkout Date",
                  accessor: "checkout_date",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
