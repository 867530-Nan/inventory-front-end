import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const { currentUser } = auth;
    if (currentUser) navigate("/dashboard");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in", err);
    }

    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card style={{ minWidth: "300px", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4 font-bold">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              className="mt-3 w-100 p-2 text-white rounded transition duration-300 ease-in-out bg-blue-500 hover:bg-gray-500"
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" className="font-bold hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account?{" "}
            <Link to="/signup" className="font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
