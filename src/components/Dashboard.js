import React, { useEffect } from "react";
import GenericCard from "./generic/GenericCard";
import { serverEndpointSwitch } from "../utils/common";
import axios from "axios";
import CheckoutsTable from "./CheckoutsTable";

export default function Dashboard() {
  const [checkoutData, setCheckoutData] = React.useState([]);
  const [checkoutCount, setCheckoutCount] = React.useState(0);
  useEffect(() => {
    axios
      .get(`${serverEndpointSwitch}/api/v1/checkouts/all-with-styles`)
      .then((response) => {
        setCheckoutData(response.data);
      })
      .catch((error) => {
        console.error("oops");
      });
    axios
      .get(`${serverEndpointSwitch}/api/v1/checkouts/checkout-counts`)
      .then((response) => {
        setCheckoutCount(response.data);
      })
      .catch((error) => {
        console.error("oops");
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-around my-4 mx-4">
        <GenericCard title="Checkouts" body={checkoutCount} />
        <GenericCard title="Checkouts" body="27" />
        <GenericCard title="Checkouts" body="27" />
        <GenericCard title="Checkouts" body="27" />
      </div>
      <div>
        <h2>Checkouts</h2>
        <CheckoutsTable data={checkoutData} />
      </div>
    </div>
  );
}
