import React, { useState } from 'react';
import axios from './axios';
import './login.css'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response =
                await axios.post('/api/user/login',
                    { email, password });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Hiba lépett fel a bejelntkezés során');
        }
    };
//    <main className="main-bg min-vh-100 d-flex flex-column"></main>
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
                          <Button 
                                type="submit" 
                                className="login-button">
                            Bejelentkezés
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
}

export default Login;