import React from "react";

export default function CheckoutsTable({ data }) {
  const displayRows = () => {
    return (
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
        <td className="whitespace-nowrap px-6 py-4">Mark</td>
        <td className="whitespace-nowrap px-6 py-4">Otto</td>
        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
      </tr>
    );
  };

  //   {
  //     "id": 2,
  //     "qr_single_id": "74c686e3-2b85-435e-8dba-3bd7a28c9a8f",
  //     "checkout_date": "2023-11-05 21:22:38",
  //     "checkin_date": "2023-11-05 21:22:42",
  //     "customer_email": "tessa@beautiful.com",
  //     "style_id": 2,
  //     "name": "Plush Honeybone",
  //     "color": "Yellow",
  //     "texture": "Plush",
  //     "price": "14.99",
  //     "availability": 100,
  //     "image_url": "www.chips.com"
  // }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
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
              </thead>
              <tbody>{displayRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
