import React, { useEffect } from "react";
import GenericCard from "./generic/GenericCard";
import { serverEndpointSwitch } from "../utils/common";
import axios from "axios";
import GenericTable from "./generic/GenericTable";

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

  function checkoutBodyRows() {
    return (
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
        <td className="whitespace-nowrap px-6 py-4">Mark</td>
        <td className="whitespace-nowrap px-6 py-4">Otto</td>
        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
      </tr>
    );
  }

  function checkoutHeadRows() {
    return (
      <tr>
        <th scope="col" className="px-6 py-4">
          #
        </th>
        <th scope="col" className="px-6 py-4">
          First
        </th>
        <th scope="col" className="px-6 py-4">
          Last
        </th>
        <th scope="col" className="px-6 py-4">
          Handle
        </th>
      </tr>
    );
  }

  return (
    <div className="flex flex-col mx-4">
      <div className="flex justify-around my-4 mx-4">
        <GenericCard title="Checkouts" body={checkoutCount} />
        <GenericCard title="Checkouts" body="27" />
        <GenericCard title="Checkouts" body="27" />
        <GenericCard title="Checkouts" body="27" />
      </div>
      <div>
        <h2>Checkouts</h2>
        <GenericTable
          headerRows={checkoutHeadRows()}
          bodyRows={checkoutBodyRows()}
        />
      </div>
    </div>
  );
}
