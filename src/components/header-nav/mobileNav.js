import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isMobile } from "../../utils/mediaQueries";

export default function MobileNav() {
  // React.useEffect(() => {
  //   if (!isMobile) return
  // }, [])
  return (
    <ul style={{ display: "flex", justifyContent: "space-around" }}>
      <li>
        <NavLink to="/">Login</NavLink>
      </li>
      <li>
        <NavLink to="/new-style">NewStyle</NavLink>
      </li>
      <li>
        <NavLink to="/orders">Order</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>
  );
}
