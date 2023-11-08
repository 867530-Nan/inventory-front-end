import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();
  const history = useNavigate();

  React.useEffect(async () => {
    await logout();
    history.push("/login");
  }, []);

  return <h1>logout</h1>;
}
