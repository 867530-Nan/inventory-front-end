import React, { useState } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../../utils/common";
import OrderForm from "./OrderForm";
import { useOrders } from "../../contexts/OrdersContext";
import { useQRCodesManager } from "../../contexts/QRCodesContext";

const OrderReview = () => {
  const { setOrderReview, orderID, setOrderID } = useOrders();
  const { setBulkStylesByQr } = useQRCodesManager();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${serverEndpointSwitch}/api/v1/orders/${orderID}`,
      );
      const { order, customer, codesAndStyles } = response.data;
      setOrderReview(customer, order);
      setBulkStylesByQr(codesAndStyles);
    } catch (error) {
      console.error("Error loading order:", error);
    }
  };

  // React.useEffect(() => {
  //   if (orderID) setOrderID(orderID);
  // }, [orderID]);

  const handleUpdate = () => {
    // Handle update logic
  };

  const handleCheckIn = () => {
    // Handle check-in logic
  };

  return (
    <div className="order-review-container">
      <h2>Review Order & Return Samples</h2>
      <div className="order-review-form">
        <label>
          Order Number:
          <input
            type="number"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
          />
        </label>
        {orderID?.length ? (
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        ) : null}
      </div>

      {orderID ? (
        <div className="order-details">
          {/* Display order details using NewOrderForm component */}
          <OrderForm
            onSubmitText="Update"
            onSubmit={() => console.log("on submit")}
          />

          {/* Buttons for update and check-in */}
          {/* <div className="update-checkin-buttons">
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleCheckIn}>
              Check-In
            </button>
          </div> */}
        </div>
      ) : (
        <p>Loading order...</p>
      )}
    </div>
  );
};

export default OrderReview;
