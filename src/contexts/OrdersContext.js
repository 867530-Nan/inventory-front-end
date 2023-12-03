// ordersContext.js

import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";

// Context
const OrdersContext = createContext();

// Initial State
const initialState = {
  orders: [],
  error: null,
  loading: false,
  completedOrder: {
    customer: {
      id: 74,
      name: "4 Gumbo",
      email: "4.gumbo@gmail.com",
      address: "4 Drive",
      phone_number: "444 444 1234",
    },
    order: {
      id: 74,
      checkout_date: "2023-12-02 21:40:42.771183-07",
      checkin_date: null,
      customer_id: 74,
    },
    codesAndStyles: [
      {
        id: 13759,
        name: "Amore",
        color: "Crema",
        price: null,
        inventory: 2,
        style_id: 66,
        qr_code: 114249,
      },
    ],
  },
};

// Reducer
const ordersReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDERS_REQUEST":
    case "CREATE_ORDER_REQUEST":
    case "UPDATE_ORDER_REQUEST":
    case "DELETE_ORDER_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_ORDERS_SUCCESS":
      return { ...state, orders: action.payload, loading: false };

    case "CREATE_ORDER_SUCCESS":
    case "UPDATE_ORDER_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_ORDER_SUCCESS":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
        loading: false,
      };

    case "FETCH_ORDERS_FAILURE":
    case "CREATE_ORDER_FAILURE":
    case "UPDATE_ORDER_FAILURE":
    case "DELETE_ORDER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "COMPLETED_ORDER":
      return { ...state, completedOrder: action.completedOrder };

    default:
      return state;
  }
};

// Actions
const fetchOrders = async (dispatch) => {
  try {
    dispatch({ type: "FETCH_ORDERS_REQUEST" });
    const response = await axios.get(`${serverEndpointSwitch}/api/v1/orders`);
    dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_ORDERS_FAILURE", payload: error.message });
  }
};

const onCompletedOrder = async (dispatch, completedOrder) => {
  try {
    dispatch({ type: "COMPLETED_ORDER", completedOrder });
  } catch (error) {
    dispatch({ type: "INCOMPLETE_ORDER" });
  }
};

const createOrder = async (dispatch, orderData) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });
    return await axios.post(`${serverEndpointSwitch}/api/v1/orders`, orderData);
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_FAILURE", payload: error.message });
  }
};

const updateOrder = async (dispatch, orderId, orderData) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });
    await axios.put(
      `${serverEndpointSwitch}/api/v1/orders/${orderId}`,
      orderData,
    );
    dispatch({ type: "UPDATE_ORDER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "UPDATE_ORDER_FAILURE", payload: error.message });
  }
};

const deleteOrder = async (dispatch, orderId) => {
  try {
    dispatch({ type: "DELETE_ORDER_REQUEST" });
    await axios.delete(`${serverEndpointSwitch}/api/v1/orders/${orderId}`);
    dispatch({ type: "DELETE_ORDER_SUCCESS", payload: orderId });
  } catch (error) {
    dispatch({ type: "DELETE_ORDER_FAILURE", payload: error.message });
  }
};

// Context Provider
const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  return (
    <OrdersContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        fetchOrders: () => fetchOrders(dispatch),
        createOrder: (orderData) => createOrder(dispatch, orderData),
        updateOrder: (orderId, orderData) =>
          updateOrder(dispatch, orderId, orderData),
        deleteOrder: (orderId) => deleteOrder(dispatch, orderId),
        onCompletedOrder: (completedOrder) =>
          onCompletedOrder(dispatch, completedOrder),
        completedOrder: state.completedOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// Custom Hook
const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};

export { OrdersProvider, useOrders };
