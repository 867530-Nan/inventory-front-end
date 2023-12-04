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

  const tabs = [
    {
      eventKey: "review",
      title: "Review",
      component: (
        <OrdersDashboard
          orders={orders}
          onOrderClick={() => onOrderClick("new")}
        />
      ),
    },
    {
      eventKey: "new",
      title: "New +",
      component: <NewOrderForm onRowClick={() => console.log("shoot")} />,
    },
  ];

  return <TabContainer tabs={tabs} initialKey="review" forcedKey={forcedKey} />;
}

export default OrdersContainer;
