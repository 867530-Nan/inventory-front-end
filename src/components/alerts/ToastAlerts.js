// ToastAlert.js

import React, { useEffect, useState } from "react";
import "./ToastAlert.css";

const ToastAlert = ({ alertText, alertType }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`toast-alert ${alertType} ${visible ? "visible" : "hidden"}`}
    >
      {alertText}
    </div>
  );
};

export default ToastAlert;
