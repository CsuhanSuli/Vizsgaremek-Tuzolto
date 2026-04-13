import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

export default function UpdateUser() {
  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: props.name,
    password: "",
    passwordConfirmation: "",
    fortyHours: props.fortyHours
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

    try {
      const resName = await fetch(`http://127.0.0.1:8000/api/user/nameChange/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name })
      });
      if (!resName.ok) throw new Error("Név módosítás sikertelen");

      if (formData.password) {
        const resPass = await fetch(`http://127.0.0.1:8000/api/user/passChange/${props.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: formData.password,
            password_confirmation: formData.passwordConfirmation
          })
        });
        if (!resPass.ok) throw new Error("Jelszó módosítás sikertelen");
      }

      const resForty = await fetch(`http://127.0.0.1:8000/api/user/fortyHourUptdate/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }

      });
      if (!resForty.ok) throw new Error("Admin státusz módosítás sikertelen");


      navigate(`/Users`);
    } catch (error) {
      console.error(error);
      setAnswer(error.message);
    }
  };

  return (
    <LoggedInLayout>
      <h1>Dolgozó adatainak módosítása</h1>
      <Form onSubmit={handleSubmit} className="formCenter">
        <Form.Group className="mb-3">
          <Form.Label>Név</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Új jelszó</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Hagyja üresen, ha nem szeretne jelszót változtatni.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jelszó megerősítése</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Írd be újra a jelszót a megerősítéshez.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 checkMargin">
          <Form.Check
            type="checkbox"
            label="40 óra"
            name="fortyHours"
            checked={formData.fortyHours === 1}
            onChange={handleChange}
            className="strong-checkbox"
          />
        </Form.Group>

        <Button type="submit" variant="danger">
          Frissítés
        </Button>
      </Form>

      {answer && <div className="mt-3 text-danger">{answer}</div>}
    </LoggedInLayout>
  );
}