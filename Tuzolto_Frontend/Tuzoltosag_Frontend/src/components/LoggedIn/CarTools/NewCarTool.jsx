import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

function NewCarTool() {
    const location = useLocation();
    const props = location.state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        placeId: "",
        carId: props?.id || props?.carId,
    });

    const [answer, setAnswer] = useState("");
    const [carPlace, setCarPlace] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        api.post("tools/store", formData)
            .then(() => {
                setAnswer("Sikeres mentés!");
                navigate(`/carTools/${formData.carId}`, { state: props });
            })
            .catch(error => {
                console.error(error);
                setAnswer("Hiba a mentés során!");
            });
    };

    useEffect(() => {
        api.get("carplace/index")
            .then((response) => setCarPlace(response.data))
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
                    <Button disabled={!formData.placeId} type="submit" variant="danger">Hozzáadás</Button>
                </Form>
                {answer && <div className="mt-3">{answer}</div>}
            </LoggedInLayout>
        </>
    );
}

export default NewCarTool;