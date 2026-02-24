import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import api from "./api"; // a saját Axios példány
import "./LoginForm.css"; // ide jön a CSS, amit megadtál

const LoginForm = () => {
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
        <Container className="main-bg flex-grow-1 d-flex align-items-start">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="login-card shadow-lg border-0">
                <Row className="g-0">

                  <Col lg={6} md={12} sm={12} className="left-side d-flex align-items-center justify-content-center">
                    <img src="Logo.jpg" alt="Tűzoltóság logó" className="img-fluid logo-img" />
                  </Col>

                  <Col lg={6} md={12} sm= {12} className="right-side d-flex align-items-center">
                    <Card.Body className="w-100 px-5">
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
                          />
                        </Form.Group>

                        <Form.Group className="mb-5">
                          <Form.Label>Jelszó</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input"
                          />
                        </Form.Group>

                        <div className="text-center">
                          <Button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Bejelentkezés..." : "Bejelentkezés"}
                          </Button>
                        </div>

                      </Form>
                    </Card.Body>
                  </Col>

                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
  );
};

export default LoginForm;