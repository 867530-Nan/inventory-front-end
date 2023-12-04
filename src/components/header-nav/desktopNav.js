import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../../firebase";

export default function DesktopNav() {
  const { currentUser } = auth;
  const location = useLocation();

  const navList = [
    { to: "/dashboard", title: "Dashboard" },
    { to: "/orders", title: "Orders" },
    { to: "/styles", title: "Styles" },
    { to: "/", title: "Login" },
  ];

  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{ maxWidth: 200 }}
    >
      <ul className="flex flex-col align-center mt-4">
        {navList.map((s) => (
          <NavLink
            key={s.to}
            to={s.to}
            className={`shadow-sm ${
              location.pathname === s.to
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } hover:bg-gray-200 transition duration-300 ease-in-out underline font-semibold my-2 p-4 w-full text-center cursor-pointer`}
            style={{ borderRadius: 10 }}
          >
            {s.title}
          </NavLink>
        ))}
      </ul>
      <>{currentUser && <p className="mt-">{currentUser.email}</p>}</>
    </div>
  );
}
