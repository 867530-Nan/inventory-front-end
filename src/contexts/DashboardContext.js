import React, { createContext, useContext, useState } from "react";
import { serverEndpointSwitch } from "../utils/common";
import axios from "axios";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [mostPopularStyles, setMostPopularStyles] = useState(null);
  const [zeroInventoryStyles, setZeroInventoryStyles] = useState(null);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalNoCheckedOutSamples, setTotalNoCheckedOutSamples] = useState(0);

  React.useEffect(() => {
    fetchAndSetMostPopularStyles();
    fetchZeroInventoryStyles();
    fetchTotalOrders();
    fetchNumberOfCheckedOutSamples();
  }, []);

  const fetchAndSetMostPopularStyles = async () => {
    await axios
      .get(`${serverEndpointSwitch}/api/v1/dashboard/most-popular-styles`)
      .then((res) => setMostPopularStyles(res.data));
  };

  const fetchTotalOrders = async () => {
    await axios
      .get(`${serverEndpointSwitch}/api/v1/orders/order-counts`)
      .then((res) => setTotalOrdersCount(res.data));
  };

  const fetchZeroInventoryStyles = async () => {
    await axios
      .get(`${serverEndpointSwitch}/api/v1/dashboard/zero-inventory-styles`)
      .then((res) => setZeroInventoryStyles(res.data));
  };
  const fetchNumberOfCheckedOutSamples = async () => {
    await axios
      .get(`${serverEndpointSwitch}/api/v1/dashboard/checked-out-samples`)
      .then((res) => {
        console.log("yo bithc", res);
        setTotalNoCheckedOutSamples(res.data);
      });
  };

  const value = {
    totalOrdersCount,
    mostPopularStyles,
    setMostPopularStyles,
    fetchAndSetMostPopularStyles,
    totalNoCheckedOutSamples,
    fetchZeroInventoryStyles,
    zeroInventoryStyles,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
