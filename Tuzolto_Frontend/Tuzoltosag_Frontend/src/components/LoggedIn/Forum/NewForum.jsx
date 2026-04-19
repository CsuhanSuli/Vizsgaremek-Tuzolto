import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";
import "./Forum.css";

export default function UpdateForum() {
  const navigate = useNavigate();

  const [type, setType] = useState([]);
  const [answer, setAnswer] = useState("");
  const [formData, setFormData] = useState({
    header: "",
    date: "",
    typeId: "",
    place: "",
    description: "",
    imageName: "",
  });

  useEffect(() => {
    api
      .get("forumType/index")
      .then((response) => setType(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    api
      .post(`forum/store`, formData)
      .then(() => {
        setAnswer("Sikeres módosítás!");
        setTimeout(() => navigate("/Forum"), 2000);
      })
      .catch((error) => {
        console.error(error);
        setAnswer("Hiba a módosítás során!");
      });
  };

  return (
    <LoggedInLayout>
      <h1>Fórum bejegyzés hozzáadása</h1>

      <Form onSubmit={handleSubmit} className="formCenter">
        <Form.Group className="mb-3">
          <Form.Label>Cím:</Form.Label>
          <Form.Control
            required
            type="text"
            name="header"
            value={formData.header}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dátum:</Form.Label>
          <Form.Control
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Típus:</Form.Label>
          <Form.Select
            name="typeId"
            value={formData.typeId}
            onChange={handleChange}
            required
          >
            <option value="">---Válassz típust!---</option>
            {type.map((row) => (
              <option key={row.id} value={row.id}>
                {row.typeName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Helyszín:</Form.Label>
          <Form.Control
            required
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Leírás:</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={7}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kép neve / elérési útja:</Form.Label>
          <Form.Control
            type="text"
            name="imageName"
            value={formData.imageName}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="danger">
            Menté
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Mégse
          </Button>
        </div>

        {answer && <p className="mt-3">{answer}</p>}
      </Form>
    </LoggedInLayout>
  );
}
