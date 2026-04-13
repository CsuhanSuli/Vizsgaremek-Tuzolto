import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

function UpdateCar() {
    const location = useLocation();
    const props = location.state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: props?.name || "",
        typeId: props?.typeId || "",
        imageName: props?.imageName || "",
    });

    const [answer, setAnswer] = useState("");
    const [carType, setCarType] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        api.put(`car/put/${props.id}`, formData)
            .then(() => {
                navigate(`/CarsLoggedIn`);
            })
            .catch(error => {
                console.error(error);
                setAnswer("Hiba a mentés során!");
            });
    };

    useEffect(() => {
        api.get("cartype/index")
            .then((response) => setCarType(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <LoggedInLayout>
                <h1>Autó módosítása</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Autó neve:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Típusa:</Form.Label>
                        <Form.Select
                            required
                            name="typeId"
                            value={formData.typeId}
                            onChange={handleChange}
                        >
                            <option value="" disabled>---Válasszon!---</option>
                            {carType.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.typename}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Kép neve:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="imageName"
                            value={formData.imageName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button disabled={!formData.typeId} type="submit" variant="danger">Mentés</Button>
                </Form>
                {answer && <div className="mt-3">{answer}</div>}
            </LoggedInLayout>
        </>
    );
}

export default UpdateCar;