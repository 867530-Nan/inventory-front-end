import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";

export default function DesktopNav() {
  const { currentUser } = auth;
  console.log("the auth obj", auth);
  const navList = [
    { to: "/dashboard", title: "Dashboard" },
    { to: "/mobile-scanner", title: "Scanner" },
    { to: "/contact", title: "Contact" },
    { to: "/", title: "Login" },
  ];
  return (
    <div className="flex flex-col justify-between h-full">
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
