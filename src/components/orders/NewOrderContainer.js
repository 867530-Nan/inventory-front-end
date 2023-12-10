import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useQRCodesManager } from "../../contexts/QRCodesContext";
import { useOrders } from "../../contexts/OrdersContext";
import OrderForm from "./OrderForm";
import { useBannerAlert } from "../../contexts/BannerAlertContext";
import OrderConfirmation from "./OrderConfirmation";

const NewOrderContainer = ({ onClose }) => {
  const navigate = useNavigate();
  const { stylesByQRArray } = useQRCodesManager();
  const [showOrderConfirmation, setShowOrderConfirmation] =
    React.useState(false);
  const {
    createOrder,
    doSetOrderInformation,
    customerName,
    customerAddress,
    customerPhoneNumber,
    customerEmail,
  } = useOrders();

  const { showFailAlert, showSuccessAlert } = useBannerAlert();

  const handleSubmit = (e) => {
    if (Object.values(stylesByQRArray).length > 0) {
      const userConfirmed = window.confirm("Create Order?");

      if (userConfirmed) {
        // User clicked 'OK'
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
            doSetOrderInformation(res.data);
            showSuccessAlert("Successfully created order.");
            setShowOrderConfirmation(true);
          })
          .catch((e) => {
            showFailAlert("Error creating order, try again.");
            console.error("could not create order, sorry man", e);
          });
      } else {
        // User clicked 'Cancel'
      }
    } else {
      alert("Orders must have at least 1 sample.");
    }
  };

  return (
    <div className="sample-form-container">
      <h2>{showOrderConfirmation ? "Order Confirmation" : "New Order"}</h2>
      <div className="mt-3">
        {showOrderConfirmation ? (
          <OrderConfirmation onClose={onClose} />
        ) : (
          <OrderForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default NewOrderContainer;
