import LoggedInLayout from "../LoggedInLayout";
import { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import api from "../../Login/api";

export default function Registration() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        isAdmin: 0,
        fortyHours: 0
    });

    const [answer, setAnswer] = useState({ message: "", variant: "" });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAnswer({ message: "", variant: "" });

        if (formData.password !== formData.password_confirmation) {
            setAnswer({ message: "A két jelszó nem egyezik!", variant: "danger" });
            return;
        }

        api.post("user/register", formData)
            .then(() => {
                setFormData({ 
                    name: "", 
                    email: "", 
                    password: "", 
                    password_confirmation: "",
                    isAdmin: 0,
                    fortyHours: 0
                });
                setAnswer({ message: "Sikeres regisztráció!", variant: "success" });
            })
            .catch((error) => {
                console.error("Hiba:", error);
                const errorMsg = error.response?.data?.message || "Szerver hiba történt.";
                setAnswer({ message: errorMsg, variant: "danger" });
            });
    };

    return (
        <LoggedInLayout>
            <h1 className="mb-4">Regisztráció</h1>

            {answer.message && (
                <Alert variant={answer.variant}>
                    {answer.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Név:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Jelszó:</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Jelszó megerősítése:</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox"
                        id="isAdmin"
                        name="isAdmin"
                        label="Admin"
                        checked={formData.isAdmin === 1} 
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox"
                        id="fortyHours"
                        name="fortyHours"
                        label="40 óra"
                        checked={formData.fortyHours === 1} 
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="danger" className="w-100 mt-2">
                    Regisztráció
                </Button>
            </Form>
        </LoggedInLayout>
    );
}