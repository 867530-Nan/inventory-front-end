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
  const [completedOrder, setCompletedOrder] = useState({});

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverEndpointSwitch}/api/v1/orders`);
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetCompletedOrder = () => {
    setCompletedOrder({});
  };

  const onCompletedOrder = (completedOrder) => {
    setCompletedOrder(completedOrder);
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
    deleteOrder,
    onCompletedOrder,
    completedOrder,
    resetCompletedOrder,
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
