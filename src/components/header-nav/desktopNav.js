import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";

export default function DesktopNav() {
  const { currentUser } = auth;

  const navList = [
    { to: "/dashboard", title: "Dashboard" },
    { to: "/order-dashboard", title: "Order" },
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
              className="shadow-sm hover:shadow-lg transition duration-300 ease-in-out underline weight-700 my-2 bg-green p-4 w-full text-center cursor-pointer"
              style={{
                borderRadius: 10,
              }}
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