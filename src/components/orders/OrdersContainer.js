import NewOrderContainer from "./NewOrderContainer";
import OrdersDashboard from "./OrdersDashboard";
import React, { useState } from "react";
import { useOrders } from "../../contexts/OrdersContext";
import TabContainer from "../generic/TabContainer";
import OrderReview from "./OrderReview.component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverEndpointSwitch } from "../../utils/common";
import { useQRCodesManager } from "../../contexts/QRCodesContext";

function OrdersContainer() {
  const [forcedKey, setForcedKey] = useState("dashboard");
  const {
    orders,
    setOrderReview,
    fetchOrders,
    setOrderID,
    resetOrderInformation,
    resetOrderFormInfo,
  } = useOrders();
  const { setBulkStylesByQr, setStylesByQR } = useQRCodesManager();
  React.useEffect(() => {
    fetchOrders();
    resetOrderInformation();
  }, []);

  const onOrderClick = (key) => {
    setForcedKey(key);
  };

  const resetForced = (key) => {
    setForcedKey(key);
  };

  const resetTabs = () => {
    setForcedKey("dashboard");
  };

  const handleOrderClick = async ({ order_id }) => {
    const response = await axios.get(
      `${serverEndpointSwitch}/api/v1/orders/${order_id}`,
    );
    const { order, customer, codesAndStyles } = response.data;
    setOrderReview(customer, order);
    setBulkStylesByQr(codesAndStyles);
    setForcedKey("review");
  };

  const handleLandingAtHome = () => {
    resetOrderFormInfo();
    setStylesByQR({});
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
      component: <NewOrderContainer onClose={resetTabs} />,
    },
    {
      eventKey: "review",
      title: "Review",
      component: <OrderReview onCheckin={resetTabs} />,
    },
  ];

  return (
    <TabContainer
      tabs={tabs}
      initialKey="dashboard"
      forcedKey={forcedKey}
      resetForced={resetForced}
      onHomeLand={handleLandingAtHome}
    />
  );
}

export default OrdersContainer;
