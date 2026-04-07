import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

function UpdateCarTool() {
  const location = useLocation();
  const props = location.state;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: props.name,
    placeId: props.placeId,
    carId: props.carId,
  });

  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/tools/put/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        props.name = formData.name;
        props.placeId = formData.placeId;
        props.carId = formData.carId;
        setAnswer("Sikeres mentés!");
        navigate(`/CarTools/${props.carId}`, {state:props})
      })
      .catch((error) => {
        console.log(formData);
        console.error(error);
        setAnswer("Hiba a mentés során!");
      });
  };
  const [carPlace, setCarPlace] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/carplace/index")
      .then((response) => response.json())
      .then((data) => setCarPlace(data))
      .catch((error) => console.error(error));
  }, []);

  const [car, setCar] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/car/get")
      .then((response) => response.json())
      .then((json) => setCar(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <LoggedInLayout>
        <h1>Új szerszám hozzáadása</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Szerszám neve:</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Helye:</Form.Label>
            <Form.Select
              name="placeId"
              value={formData.placeId}
              onChange={handleChange}
            >
              <option value="" disabled>
                ---Válasszon!---
              </option>
              {carPlace.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.place}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Autó:</Form.Label>
            <Form.Select
              name="carId"
              value={formData.carId}
              onChange={handleChange}
            >
              <option value="" disabled>
                ---Válasszon!---
              </option>
              {car.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="danger">
            Módosítás
          </Button>
        </Form>
        {answer && <div>{answer}</div>}
      </LoggedInLayout>
    </>
  );
}

export default UpdateCarTool;
