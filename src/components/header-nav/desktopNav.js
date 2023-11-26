import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";

export default function DesktopNav() {
  const { currentUser } = auth;

  const navList = [
    { to: "/dashboard", title: "Dashboard" },
    { to: "/checkout-dashboard", title: "Check In / Out" },
    { to: "/styles", title: "Styles" },
    { to: "/", title: "Login" },
  ];
  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{ maxWidth: 200 }}
    >
      <ul className="flex flex-col align-center mt-4">
        {navList.map((s) => {
          return (
            <NavLink
              key={s.to}
              to={s.to}
              className="hover:underline hover:weight-700 my-2 hover:bg-green p-4 w-full text-center hover:cursor-pointer"
            >
              {s.title}
            </NavLink>
          );
        })}
      </ul>
      <>{currentUser && <p className="mt-">{currentUser.email}</p>}</>
    </div>
  );
}
