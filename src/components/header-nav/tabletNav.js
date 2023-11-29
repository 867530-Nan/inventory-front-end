import React from "react";
import { NavLink } from "react-router-dom";

export default function TabletNav() {
  return (
    <ul style={{ display: "flex", justifyContent: "space-around" }}>
      <li>
        <NavLink to="/">Login</NavLink>
      </li>
      <li>
        <NavLink to="/new-style">NewStyle</NavLink>
      </li>
      <li>
        <NavLink to="/order-dashboard">Order</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>
  );
}
