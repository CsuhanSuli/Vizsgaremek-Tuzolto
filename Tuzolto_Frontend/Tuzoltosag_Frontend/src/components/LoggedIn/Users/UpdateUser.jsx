import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

export default function UpdateUser() {
  const location = useLocation();
  const props = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: props.name || "",
    password: "",
    passwordConfirmation: "",
    fortyHours: props.fortyHours || 0
  });

  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("");

    if (formData.password) {
      if (formData.password.length < 4) {
        setAnswer("A jelszónak legalább 4 karakter hosszúnak kell lennie!");
        return;
      }
      if (formData.password !== formData.passwordConfirmation) {
        setAnswer("A jelszó és a megerősítés nem egyezik!");
        return;
      }
    }

    if (!props.id) {
      setAnswer("Hiba: Hiányzó felhasználó azonosító!");
      return;
    }

    try {
      await api.put(`user/nameChange/${props.id}`, { 
        name: formData.name 
      });

      if (formData.password) {
        await api.put(`user/passChange/${props.id}`, {
          password: formData.password,
          password_confirmation: formData.passwordConfirmation
        });
      }

      await api.put(`user/fortyHourUpdate/${props.id}`, { 
        fortyHours: formData.fortyHours 
      });

      navigate("/Users");
    } catch (error) {
      console.error("Hiba részletei:", error.response || error);
      const errorMsg = error.response?.data?.message || "Hiba történt a mentés során! Ellenőrizd az útvonalakat.";
      setAnswer(errorMsg);
    }
  };

  return (
    <LoggedInLayout>
      <Container className="py-4">
        <h1 className="text-center mb-4">Dolgozó adatainak módosítása</h1>
        
        <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Név</strong></Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Új jelszó</strong></Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Hagyja üresen, ha nem módosítja"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Jelszó megerősítése</strong></Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="40 óra"
              name="fortyHours"
              checked={formData.fortyHours === 1}
              onChange={handleChange}
              id="fortyHoursCheck"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="danger" size="lg">
              Adatok frissítése
            </Button>
            <Button variant="secondary" onClick={() => navigate("/Users")}>
              Mégse
            </Button>
          </div>
        </Form>

        {answer && (
          <div className="mt-4 alert alert-danger text-center">
            {answer}
          </div>
        )}
      </Container>
    </LoggedInLayout>
  );
}