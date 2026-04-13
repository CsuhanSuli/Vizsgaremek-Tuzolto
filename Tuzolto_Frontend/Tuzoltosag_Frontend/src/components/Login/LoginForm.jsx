import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import api from "./api";
import "./LoginForm.css";
import LoggedOutLayout from "../LoggedOut/LoggedOutLayout";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("user/login", { email, password });

      if (response.data.token) {
        // Token és felhasználó elmentése a későbbi azonosításhoz
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // JAVÍTÁS: Átirányítás közvetlenül a naptárra
        navigate("/Calendar");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Hiba történt a bejelentkezés során");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoggedOutLayout>
      <Container className="main-bg flex-grow-1 d-flex align-items-start">
        <Row className="justify-content-center w-100">
          <Col lg={10}>
            <Card className="login-card shadow-lg border-0">
              <Row className="g-0">
                <Col lg={6} className="left-side d-flex align-items-center justify-content-center">
                  <img src="Logo.jpg" alt="Logo" className="img-fluid logo-img" />
                </Col>
                <Col lg={6} className="right-side d-flex align-items-center">
                  <Card.Body className="w-100 px-5">
                    <h3 className="mb-4 text-center">Bejelentkezés</h3>
                    
                    {error && <p className="text-danger text-center small">{error}</p>}
                    
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="custom-input"
                          placeholder="pelda@email.com"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-5">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="custom-input"
                          placeholder="********"
                        />
                      </Form.Group>
                      
                      <div className="text-center">
                        <Button 
                          type="submit" 
                          className="login-button w-100" 
                          variant="primary"
                          disabled={loading}
                        >
                          {loading ? "Folyamatban..." : "Bejelentkezés"}
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
    </LoggedOutLayout>
  );
};

export default LoginForm;