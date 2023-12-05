import NewOrderForm from "./NewOrderForm";
import OrdersDashboard from "./OrdersDashboard";
import React, { useState } from "react";
import { useOrders } from "../../contexts/OrdersContext";
import TabContainer from "../generic/TabContainer";

function OrdersContainer() {
  const [forcedKey, setForcedKey] = useState("");
  const { orders, fetchOrders } = useOrders();

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const onOrderClick = (key) => {
    setForcedKey(key);
  };

  const handleOrderClick = (order) => {
    console.log("handle order click", order);
    // onSelectStyle(style);
    // setForcedKey("single");
    // setPassedStyle(style.id);
  };

  const tabs = [
    {
      eventKey: "dashboard",
      title: "Dashboard",
      component: (
        <OrdersDashboard
          orders={orders}
          onOrderClick={() => onOrderClick("new")}
          onRowClick={handleOrderClick}
        />
      ),
    },
    {
      eventKey: "new",
      title: "New +",
      component: <NewOrderForm />,
    },
  ];

  return (
    <TabContainer tabs={tabs} initialKey="dashboard" forcedKey={forcedKey} />
  );
}

export default OrdersContainer;
