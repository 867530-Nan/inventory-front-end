import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(async () => {
    await logout();
    navigate("/login");
  }, []);

  return <h1>logout</h1>;
}
