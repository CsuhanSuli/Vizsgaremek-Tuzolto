import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

function NewCarTool() {

    const location = useLocation();
    const props = location.state;
    const [formData, setFormData] = useState({
        name: "",
        placeId: "",
        carId: props.id,
    });

    const [answer, setAnswer] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/tools/store",{
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formData),

        })
        .then(() => {
            setFormData({
                name: "",
                placeId: "",
                carId: props.id,
            })
            setAnswer("Sikeres mentés!")
            navigate(`/carTools/${props.carId}`, {state: props})
        })
        .catch(error => {
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })

    }
    const [carPlace, setCarPlace] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/carplace/index")
        .then((response) => response.json())
        .then((data) => setCarPlace(data))
        .catch((error) => console.error(error));
    }, [])

    return(
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

                            {carPlace.map((props) => (
                                <option key={props.id} value={props.id}>
                                    {props.place}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="danger" onClick={handleSubmit}>Hozzáadás</Button>
                </Form>
                {answer && <div>{answer}</div>}
            </LoggedInLayout>
        </>
    )


}

export default NewCarTool;