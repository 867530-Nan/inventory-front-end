import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useQRCodesManager } from "../../contexts/QRCodesContext";
import { useOrders } from "../../contexts/OrdersContext";
import OrderForm from "./OrderForm";

const NewOrderContainer = ({}) => {
  const navigate = useNavigate();
  const { stylesByQRArray } = useQRCodesManager();
  const {
    createOrder,
    onCompletedOrder,
    completedOrder,
    customerName,
    customerAddress,
    customerPhoneNumber,
    customerEmail,
  } = useOrders();

  useEffect(() => {
    if (completedOrder?.order?.id) {
      console.log("completedOrder.order.id: ", completedOrder.order.id);
      navigate("/order-confirmation");
    }
  }, [completedOrder]);

  const handleSubmit = (e) => {
    createOrder({
      customer: {
        name: customerName,
        address: customerAddress,
        phoneNumber: customerPhoneNumber,
        email: customerEmail,
      },
      qr_code_ids: Object.values(stylesByQRArray).map((s) => s.id),
    })
      .then((res) => {
        console.log("great success: ", res.data);
        onCompletedOrder(res.data);
        redirect("/order-confirmation");
      })
      .catch((e) => console.error("could not create order, sorry man", e));
  };

  return (
    <div className="sample-form-container">
      <h2>New Order</h2>
      <div className="mt-3">
        <OrderForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewOrderContainer;
