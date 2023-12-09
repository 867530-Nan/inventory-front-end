import React from "react";
import { useOrders } from "../../contexts/OrdersContext"; // Replace with your actual context file
import { generatePDF } from "../../utils/generatePDF";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { completedOrder, resetCompletedOrder } = useOrders();
  const navigate = useNavigate();

  const businessInfo = {
    name: "A-Z Flooring",
    address: "5 Gordon Place, Newtown, Wellington 6021",
    hours: `
      Sunday    Closed
      Monday    9 am–5 pm
      Tuesday   9 am–5 pm
      Wednesday 9 am–5 pm
      Thursday  9 am–5 pm
      Friday    9 am–5 pm
      Saturday  10 am–1 pm
    `,
  };

  const closeConfirmation = () => {
    resetCompletedOrder();
    navigate("/orders");
  };

  const handlePrint = () => {
    const pdfDoc = generatePDF(completedOrder, businessInfo);
    pdfDoc.save("order_confirmation.pdf");
  };

  const handleEmail = () => {
    const pdfDoc = generatePDF(completedOrder, businessInfo);
    const pdfDataUri = pdfDoc.output("datauristring");

    // Create a mailto link with the PDF attached
    const mailtoLink = `mailto:${
      completedOrder.customer.email
    }?subject=Order Confirmation&body=Attached is your order confirmation.&attachment=${encodeURIComponent(
      pdfDataUri,
    )}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  if (!completedOrder) {
    // If no completed order is available, you might want to handle this case
    return <div>No order details available.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {/* Order Information Header */}
        <h2 className="text-2xl font-semibold mb-4">
          Order #{completedOrder.order.id} Confirmation
        </h2>
        <p>
          <span className="font-semibold">Checkout Date:</span>{" "}
          {moment(completedOrder.order.checkout_date).format("MMMM Do YYYY")}
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
        <div className="flex flex-col mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-2"
            onClick={handlePrint}
          >
            Print PDF
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none mb-2"
            onClick={handleEmail}
          >
            Email PDF
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
            onClick={closeConfirmation}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
