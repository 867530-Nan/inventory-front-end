import NewOrderContainer from "./NewOrderContainer";
import OrdersDashboard from "./OrdersDashboard";
import React, { useState } from "react";
import { useOrders } from "../../contexts/OrdersContext";
import TabContainer from "../generic/TabContainer";
import OrderReview from "./OrderReview.component";

function OrdersContainer() {
  const [forcedKey, setForcedKey] = useState("");
  const { orders, fetchOrders, resetOrderInformation } = useOrders();

  React.useEffect(() => {
    fetchOrders();
    resetOrderInformation();
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
      title: "All Orders",
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
      component: <NewOrderContainer />,
    },
    {
      eventKey: "review",
      title: "Review",
      component: <OrderReview />,
    },
  ];

  return (
    <TabContainer tabs={tabs} initialKey="dashboard" forcedKey={forcedKey} />
  );
}

export default OrdersContainer;
