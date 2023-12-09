import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";

const OrdersContext = createContext();

// {
//   "order_id": 29,
//   "checkout_date": "2023-12-01 20:06:28.046498-07",
//   "checkin_date": null,
//   "customer_id": 43,
//   "customer_name": "3 Gumbo",
//   "customer_email": "3.gumbo@gmail.com",
//   "customer_address": "3 Drive",
//   "customer_phone_number": "021 038 6301",
//   "qr_code_id": 13617,
//   "qr_code": 112990,
//   "style_id": 1,
//   "style_name": "8th Wonder",
//   "style_color": "0280 Whakarewarewa"
// }

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderInformation, setOrderInformation] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderID, setOrderID] = useState("");
  const [orderCheckin, setOrderCheckin] = React.useState("");
  const [orderCheckout, setOrderCheckout] = React.useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverEndpointSwitch}/api/v1/orders/dashboard`,
      );
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetOrderInformation = () => {
    setOrderInformation({});
  };

  const doSetOrderInformation = (orderInformation) => {
    setOrderInformation(orderInformation);
  };

  const setOrderReview = (customer, order) => {
    const { name, address, phone_number, email } = customer;
    setCustomerName(name);
    setCustomerAddress(address);
    setCustomerPhoneNumber(phone_number);
    setCustomerEmail(email);
    setOrderID(order.id);
    setOrderCheckin(order.checkin_date);
    setOrderCheckout(order.checkout_date);
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      return await axios.post(
        `${serverEndpointSwitch}/api/v1/orders`,
        orderData,
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (orderId, orderData) => {
    try {
      setLoading(true);
      await axios.put(
        `${serverEndpointSwitch}/api/v1/orders/${orderId}`,
        orderData,
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      await axios.delete(`${serverEndpointSwitch}/api/v1/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterOrdersByName = (nameFilter) => {
    return orders.filter((order) =>
      order.customer_name.toLowerCase().includes(nameFilter.toLowerCase()),
    );
  };

  const filterOrdersByEmail = (emailFilter) => {
    return orders.filter((order) =>
      order.customer_email.toLowerCase().includes(emailFilter.toLowerCase()),
    );
  };

  // Context values
  const contextValues = {
    orders,
    loading,
    error,
    filterOrdersByEmail,
    filterOrdersByName,
    fetchOrders,
    createOrder,
    updateOrder,
    orderID,
    orderCheckin,
    orderCheckout,
    deleteOrder,
    doSetOrderInformation,
    orderInformation,
    resetOrderInformation,
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
    selectedCustomer,
    setSelectedCustomer,
    setOrderReview,
  };

  return (
    <OrdersContext.Provider value={contextValues}>
      {children}
    </OrdersContext.Provider>
  );
};

const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};

export { OrdersProvider, useOrders };
