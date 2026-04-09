import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import "./Forum.css";
import LoggedInLayout from "../LoggedInLayout";

export default function UpdateForum() {
    const [type, setType] = useState([]);
    const [answer, setAnswer] = useState("");

    const location = useLocation();
    const props = location.state;

    const [formData, setFormData] = useState({
        header: props.header,
        date: props.date,
        typeId: props.typeId,
        place: props.place,
        description: props.description,
        imageName: null,
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/forumType/index")
            .then((response) => response.json())
            .then((json) => setType(json))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("_method", "PUT");

            data.append("header", formData.header);
            data.append("date", formData.date);
            data.append("typeId", formData.typeId);
            data.append("place", formData.place);
            data.append("description", formData.description);

            if (formData.imageName) {
                data.append("imageName", formData.imageName);
            }

            const response = await fetch(
                `http://127.0.0.1:8000/api/forum/put/${props.id}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: data,
                }
            );

            const result = await response.json();

            if (!response.ok) {
                console.error(result);
                setAnswer("Hiba a mentés során!");
                return;
            }

            setAnswer("Sikeres mentés!");
            console.log(result);

        } catch (error) {
            console.error(error);
            setAnswer("Hálózati hiba!");
        }
    };

    return (
        <LoggedInLayout>
            <h1>Fórum bejegyzés módosítás</h1>
            <Form onSubmit={handleSubmit} className="formCenter">
                <Form.Group className="mb-3">
                    <Form.Label>Cím:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="header"
                        onChange={handleChange}
                        value={formData.header}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Dátum:</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
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
                        <option value="" disabled>---Válassz típust!---</option>
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
                        onChange={handleChange}
                        value={formData.place}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Leírás:</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        rows={7}
                        
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Kép feltöltés:</Form.Label>
                    <Form.Control
                        type="file"
                        name="imageName"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="danger">
                    Mentés
                </Button>

                {answer && <p>{answer}</p>}
            </Form>
        </LoggedInLayout>
    );
}