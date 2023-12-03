import React from "react";
import { useOrders } from "../contexts/OrdersContext"; // Replace with your actual context file

const OrderConfirmation = () => {
  const { completedOrder } = useOrders();

  if (!completedOrder) {
    // If no completed order is available, you might want to handle this case
    return <div>No order details available.</div>;
  }

  const handlePrint = () => {
    // Logic for printing PDF
    console.log("Printing PDF");
  };

  const handleEmail = () => {
    // Logic for emailing PDF
    console.log("Emailing PDF");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {/* Order Information Header */}
        <h2 className="text-2xl font-semibold mb-4">
          Order #{completedOrder.order.id} Confirmation
        </h2>
        <p>
          <span className="font-semibold">Checkout Date:</span>{" "}
          {completedOrder.order.checkout_date}
        </p>

        {/* Customer Information */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Customer Information:</h3>
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {completedOrder.customer.name}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {completedOrder.customer.address}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {completedOrder.customer.email}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {completedOrder.customer.phone_number}
          </p>
        </div>

        {/* Samples Information */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Samples:</h3>
          <ul>
            {completedOrder.codesAndStyles.map((sample) => (
              <li key={sample.id}>
                {sample.name} - {sample.color} (#{sample.qr_code})
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons for Print and Email */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handlePrint}
          >
            Print PDF
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            onClick={handleEmail}
          >
            Email PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
