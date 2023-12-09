import React, { useState } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../../utils/common";
import OrderForm from "./OrderForm";
import { useOrders } from "../../contexts/OrdersContext";
import { useQRCodesManager } from "../../contexts/QRCodesContext";

const OrderReview = () => {
  const {
    setOrderReview,
    orderID,
    customerName,
    customerAddress,
    orderCheckin,
    orderCheckout,
    customerPhoneNumber,
    customerEmail,
    setOrderID,
  } = useOrders();
  const { setBulkStylesByQr, getQRCodeIDs } = useQRCodesManager();

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

  const handleUpdate = async () => {
    console.log("all of them", getQRCodeIDs());
    const orderData = {
      orderId: orderID,
      customer: {
        name: customerName,
        address: customerAddress,
        phoneNumber: customerPhoneNumber,
        email: customerEmail,
      },
      qr_code_ids: getQRCodeIDs(),
    };

    await axios
      .put(
        `${serverEndpointSwitch}/api/v1/orders/update-entire-order/${orderData.orderId}`,
        orderData,
      )
      .then(() => alert("Order successfully updated."))
      .catch(() => alert("Error updating order."));
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
          <OrderForm onSubmitText="Update" onSubmit={handleUpdate} />
        </div>
      ) : (
        <p>Loading order...</p>
      )}
    </div>
  );
};

export default OrderReview;
