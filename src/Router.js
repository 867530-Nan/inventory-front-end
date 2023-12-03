import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { auth } from "./firebase";

import Home from "./components/Home";
import Logout from "./components/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Styles from "./components/styles";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import OrderConfirmation from "./components/OrderConfirmation";

import MobileNav from "./components/header-nav/mobileNav";
import DesktopNav from "./components/header-nav/desktopNav";
import TabletNav from "./components/header-nav/tabletNav";
import OrderDashboard from "./components/OrderDashboard";

const Router = () => {
  const { currentUser } = auth;
  const isNotMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <BrowserRouter>
      <div className="flex h-100vh overflow-hidden">
        <div className="h-screen">
          {isNotMobile && <DesktopNav />}
          {isMobile && <MobileNav />}
        </div>
        <div className="flex-1 h-full">
          <Routes>
            {/* <PrivateRoute path="new-style/*" element={<NewStyle />} />
          <PrivateRoute path="update-profile/" element={<UpdateProfile />} /> */}
            <Route
              path="/order-manager"
              element={
                currentUser ? <OrderDashboard /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="styles/*"
              element={currentUser ? <Styles /> : <Navigate replace to="/" />}
            />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<OrderDashboard />} />
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
