import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import api from "./api";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("user/login", { email, password });

      setSuccess("Sikeres bejelentkezés!");
      console.log("Válasz:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Hiba történt a bejelentkezés során"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="main-bg">
  <Card className="login-card">
    <div className="left-side">
      <img src="logo.png" alt="Tűzoltóság logó" className="logo-img" />
    </div>
    <div className="right-side">
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="pelda@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Jelszó</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input"
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button type="submit" className="login-button" disabled={loading}>
            {loading ? "Bejelentkezés..." : "Bejelentkezés"}
          </Button>
        </div>
      </Form>
    </div>
  </Card>
</Container>
  );
};

export default Login;