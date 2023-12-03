import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NewOrderForm from "./NewOrderForm";
import OrdersDashboard from "./OrdersDashboard";
import React, { useState } from "react";
import { useStylesContext } from "../../contexts/StylesContext";
import { useOrders } from "../../contexts/OrdersContext";

function Index() {
  const [key, setKey] = useState("review");
  const [passedStyle, setPassedStyle] = useState(null);
  const { onSelectStyle } = useStylesContext();
  const { orders, fetchOrders } = useOrders();

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const updatePage = (key) => {
    setKey(key);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="review" title="Review">
        <OrdersDashboard
          orders={orders}
          onOrderClick={() => updatePage("new")}
        />
      </Tab>
      <Tab eventKey="new" title="New +">
        <NewOrderForm onRowClick={() => console.log("shoot")} />
      </Tab>
    </Tabs>
  );
}

export default Index;
