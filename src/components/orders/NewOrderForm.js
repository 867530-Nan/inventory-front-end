import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewOrderForm.css";
import Autocomplete from "react-google-autocomplete";
import { serverEndpointSwitch } from "../../utils/common";
import QRCodeManager from "../QRCodeManager";
import { useQRCodesManager } from "../../contexts/QRCodesContext";
import { useOrders } from "../../contexts/OrdersContext";

const NewOrderForm = ({}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();
  // ...

  const [isModalOpen, setModalOpen] = useState(false);
  const { stylesByQRArray } = useQRCodesManager();
  const { createOrder, onCompletedOrder, completedOrder } = useOrders();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (completedOrder?.order?.id) {
      console.log("completedOrder.order.id: ", completedOrder.order.id);
      navigate("/order-confirmation");
    }
  }, [completedOrder]);

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

  const handleSubmit = (e) => {
    console.log("handle submit");
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
        return redirect("/order-confirmation");
      })
      .catch((e) => console.error("could not create order, sorry man"));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Trigger the click event
      document.getElementById("newOrderSubmit").click();
    }
  };

  return (
    <div className="sample-form-container">
      <h2>New Order</h2>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <label>
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={handleCustomerNameChange}
              placeholder="Name"
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
              placeholder="Address"
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
              placeholder="Phone"
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            />
          </label>

          <label>
            Customer Email:
            <input
              type="text"
              value={customerEmail}
              placeholder="Email"
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </label>
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
              onClick={() => handleSubmit()}
              onKeyUp={handleKeyPress}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderForm;
