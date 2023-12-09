import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderForm.css";
import Autocomplete from "react-google-autocomplete";
import { serverEndpointSwitch } from "../../utils/common";
import QRCodeManager from "../QRCodeManager";
import { useQRCodesManager } from "../../contexts/QRCodesContext";
import { useOrders } from "../../contexts/OrdersContext";

const OrderForm = ({ onSubmit }) => {
  const {
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress,
    customerPhoneNumber,
    setCustomerPhoneNumber,
    customerEmail,
    setCustomerEmail,
    customerOptions,
    setCustomerOptions,
    setSelectedCustomer,
  } = useOrders();

  const handleCustomerNameChange = async (e) => {
    const inputValue = e.target.value;
    setCustomerName(inputValue);
    await axios
      .post(`${serverEndpointSwitch}/api/v1/customers/like-search`, {
        searchString: inputValue,
      })
      .then((res) => {
        setCustomerOptions(res.data);
      })
      .catch((err) => {
        console.error("Error finding customers like " + inputValue);
      });

    // setCustomerOptions(matchingCustomers);
  };

  const handleCustomerSelect = (customer) => {
    const { name, address, phone_number, email } = customer;
    setCustomerName(name);
    setCustomerAddress(address);
    setCustomerPhoneNumber(phone_number);
    setCustomerEmail(email);
    setSelectedCustomer(customer);
    setCustomerOptions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Trigger the click event
      document.getElementById("newOrderSubmit").click();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div id="fuck" className="flex flex-col">
          <label>
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={handleCustomerNameChange}
              placeholder=" Name"
            />
          </label>

          {customerOptions.length > 0 && (
            <ul className="customer-options">
              {customerOptions.map((customer, index) => (
                <li key={index} onClick={() => handleCustomerSelect(customer)}>
                  {customer.name}
                </li>
              ))}
            </ul>
          )}

          <label>
            Customer Address:
            <input
              type="text"
              value={customerAddress}
              placeholder=" Address"
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
            {/* <Autocomplete
              apiKey="AIzaSyBZYDN1laILCfG1zbm6ImoK3dtzFGQDFMc"
              value={customerAddress}
              onPlaceSelected={(place) => {
                setCustomerAddress(place.formatted_address);
              }}
            /> */}
          </label>

          <label>
            Customer Phone Number:
            <input
              type="phone"
              value={customerPhoneNumber}
              placeholder=" Phone"
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            />
          </label>

          <label>
            Customer Email:
            <input
              type="text"
              value={customerEmail}
              placeholder=" Email"
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <h2 className="mt-2">Sample Manager</h2>
          <div className="mt-2 flex">
            <QRCodeManager />
          </div>
        </div>
        <div className="mt-3">
          <button
            type="button"
            id="newOrderSubmit"
            onClick={() => onSubmit()}
            onKeyUp={handleKeyPress}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
