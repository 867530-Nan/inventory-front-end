import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { auth } from "./firebase";

import Home from "./components/Home";
import Logout from "./components/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OrderManager from "./components/orders";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import OrderConfirmation from "./components/orders/OrderConfirmation";

import MobileNav from "./components/header-nav/mobileNav";
import DesktopNav from "./components/header-nav/desktopNav";
import StylesContainer from "./components/styles";

const Router = () => {
  const { currentUser } = auth;
  const isNotMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <BrowserRouter>
      <div className="flex max-h-full overflow-hidden">
        <div className="w-1/5 overflow-y-auto fixed inset-y-0 left-0">
          {isNotMobile && <DesktopNav />}
          {isMobile && <MobileNav />}
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 ml-[20%]">
          <Routes>
            <Route
              path="orders/"
              element={
                currentUser ? <OrderManager /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="styles/*"
              element={
                currentUser ? <StylesContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="dashboard/*"
              element={currentUser ? <Home /> : <Navigate replace to="/" />}
            />
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
