import React, { useState } from "react";
import "./styles/CheckoutDashboard.css";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";
const SampleForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSampleIdMode, setIsSampleIdMode] = useState(true);
  const [sampleId, setSampleId] = useState("");

  const handleCustomerNameChange = async (e) => {
    const inputValue = e.target.value;
    setCustomerName(inputValue);
    console.log('does this help"???', inputValue);
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

  const handleSampleIdChange = (e) => {
    setSampleId(e.target.value);
  };

  const toggleSampleMode = () => {
    setIsSampleIdMode(!isSampleIdMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", {
      customer: {
        name: customerName,
        address: customerAddress,
        phoneNumber: customerPhoneNumber,
        email: customerEmail,
      },
      sampleId,
    });
  };
  return (
    <div className="sample-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={handleCustomerNameChange}
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
          {/* <input
            type="text"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          /> */}
          <Autocomplete
            apiKey="AIzaSyBZYDN1laILCfG1zbm6ImoK3dtzFGQDFMc"
            value={customerAddress}
            onPlaceSelected={(place) => {
              setCustomerAddress(place.formatted_address);
            }}
          />
        </label>

        <label>
          Customer Phone Number:
          <input
            type="text"
            value={customerPhoneNumber}
            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
          />
        </label>

        <label>
          Customer Email:
          <input
            type="text"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </label>

        <label>
          {isSampleIdMode ? "Sample ID:" : "Scan QR Code:"}
          <input type="text" value={sampleId} onChange={handleSampleIdChange} />
        </label>

        <label className="toggle-label">
          <input
            type="checkbox"
            checked={isSampleIdMode}
            onChange={toggleSampleMode}
          />
          Sample ID
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SampleForm;
