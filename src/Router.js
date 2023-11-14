import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Home from "./components/Home";
import Logout from "./components/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Styles from "./components/styles";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import MobileScanner from "./components/MobileScanner";
import MobileNav from "./components/header-nav/mobileNav";
import DesktopNav from "./components/header-nav/desktopNav";
import TabletNav from "./components/header-nav/tabletNav";
import { auth } from "./firebase";

const Router = () => {
  const { currentUser } = auth;
  const isNotMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });

  const determineHome = () => {
    if (isNotMobile) return <Dashboard />;
    if (isMobile || isTablet) return <MobileScanner />;
    return <Dashboard />;
  };

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
            {/* <PrivateRoute path="mobile-scanner/" element={<MobileScanner />} /> */}
            <Route
              path="/mobile-scanner"
              element={
                currentUser ? <MobileScanner /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="styles/*"
              element={currentUser ? <Styles /> : <Navigate replace to="/" />}
            />
            <Route
              path="dashboard/*"
              element={
                currentUser ? <Dashboard /> : <Navigate replace to="/" />
              }
            />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={determineHome()} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
