import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import {
  IoIosHome,
  IoMdCart,
  IoIosColorPalette,
  IoIosLogIn,
} from "react-icons/io";

export default function DesktopNav() {
  const { currentUser } = auth;
  const location = useLocation();

  const navList = [
    { to: "/dashboard", title: "Dashboard", icon: <IoIosHome /> },
    { to: "/orders", title: "Orders", icon: <IoMdCart /> },
    { to: "/styles", title: "Styles", icon: <IoIosColorPalette /> },
    { to: "/", title: "Login", icon: <IoIosLogIn /> },
  ];

  return (
    <div className="flex flex-col justify-between" style={{ maxWidth: 200 }}>
      <ul className="flex flex-col align-start mt-4">
        {navList.map((s) => (
          <NavLink
            key={s.to}
            to={s.to}
            className={`${
              location.pathname === s.to
                ? "bg-blue-500 text-white hover:bg-blue-700"
                : "hover:bg-gray-200 text-gray-800"
            } transition duration-100 ease-in-out underline font-semibold my-2 p-2 w-full text-left cursor-pointer flex items-center`}
            style={{ borderRadius: 10 }}
          >
            <span className="mr-2">{s.icon}</span>
            {s.title}
          </NavLink>
        ))}
      </ul>
      {currentUser && (
        <small style={{ marginLeft: 5 }}>
          Logged in as:{"\n"}
          {currentUser.email}
        </small>
      )}
    </div>
  );
}
