import { jsPDF } from "jspdf";
import moment from "moment";

export const generatePDF = (orderInformation, businessInfo) => {
  const doc = new jsPDF();
  const lineHeight = 10;
  const margin = 10;
  const yOffsetIncrement = 15;

  const addText = (text, x, yOffset) => {
    doc.text(text, margin + x, margin + yOffset);
  };

  const addSectionHeader = (text, yOffset) => {
    doc.setFontSize(14);
    addText(text, 0, yOffset);
    doc.setFontSize(12);
  };

  const addCustomerInfo = () => {
    addSectionHeader("Customer Information:", 0);
    addText(`Name: ${orderInformation.customer.name}`, 10, yOffsetIncrement);
    addText(
      `Email: ${orderInformation.customer.email}`,
      10,
      yOffsetIncrement * 2,
    );
    addText(
      `Address: ${orderInformation.customer.address}`,
      10,
      yOffsetIncrement * 3,
    );
    addText(
      `Phone Number: ${orderInformation.customer.phone_number}`,
      10,
      yOffsetIncrement * 4,
    );
  };

  const addOrderInfo = () => {
    addSectionHeader("Order Information:", yOffsetIncrement * 6);
    addText(`Order ID: ${orderInformation.order.id}`, 10, yOffsetIncrement * 7);
    addText(
      `Checkout Date: ${moment(orderInformation.order.checkout_date)}`,
      10,
      yOffsetIncrement * 8,
    );
  };

  const addCodesAndStylesInfo = () => {
    addSectionHeader("Codes and Styles:", yOffsetIncrement * 10);
    let yOffset = yOffsetIncrement * 11;
    orderInformation.codesAndStyles.forEach((codeAndStyle) => {
      addText(`Style: ${codeAndStyle.name}`, 10, yOffset);
      addText(`Color: ${codeAndStyle.color}`, 10, yOffset + yOffsetIncrement);
      addText(
        `QR Code: ${codeAndStyle.qr_code}`,
        10,
        yOffset + yOffsetIncrement * 2,
      );
      yOffset += yOffsetIncrement * 4;
    });
  };

  const addBusinessInfo = () => {
    addSectionHeader("Business Contact Information:", yOffsetIncrement * 24);
    addText(`Business Name: ${businessInfo.name}`, 10, yOffsetIncrement * 25);
    addText(
      `Business Address: ${businessInfo.address}`,
      10,
      yOffsetIncrement * 26,
    );
    addText(`Business Hours:`, 10, yOffsetIncrement * 27);
    addText(businessInfo.hours, 20, yOffsetIncrement * 28);
  };

  addCustomerInfo();
  addOrderInfo();
  addCodesAndStylesInfo();
  addBusinessInfo();

  return doc;
};
