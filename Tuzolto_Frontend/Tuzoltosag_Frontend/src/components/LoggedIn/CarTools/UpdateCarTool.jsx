import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

function UpdateCarTool() {
  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: props?.name || "",
    placeId: props?.placeId || "",
    carId: props?.carId || "",
  });

  const [answer, setAnswer] = useState("");
  const [carPlace, setCarPlace] = useState([]);
  const [car, setCar] = useState([]);

  useEffect(() => {
    api.get("carplace/index")
      .then((response) => setCarPlace(response.data))
      .catch((error) => console.error(error));

    api.get("car/get")
      .then((response) => setCar(response.data))
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
    api.put(`tools/put/${props.id}`, formData)
      .then(() => {
        setAnswer("Sikeres mentés!");
        navigate(`/carTools/${formData.carId}`, { state: props });
      })
      .catch((error) => {
        console.error(error);
        setAnswer("Hiba a mentés során!");
      });
  };

  return (
    <>
      <LoggedInLayout>
        <h1>Szerszám módosítása</h1>
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
              required
              name="placeId"
              value={formData.placeId}
              onChange={handleChange}
            >
              <option value="" disabled>---Válasszon!---</option>
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
              required
              name="carId"
              value={formData.carId}
              onChange={handleChange}
            >
              <option value="" disabled>---Válasszon!---</option>
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
        {answer && <div className="mt-3">{answer}</div>}
      </LoggedInLayout>
    </>
  );
}

export default UpdateCarTool;