import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Forum.css";
import LoggedInLayout from "../LoggedInLayout";

export default function UpdateForum() {
    const [type, setType] = useState([]);
    const [answer, setAnswer] = useState("");

    const [formData, setFormData] = useState({
        header: "",
        date: "",
        typeId: "",
        place: "",
        description: "",
        imageName: null,
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/forumType/index")
            .then((response) => response.json())
            .then((json) => setType(json))
            .catch((error) => console.error("Hiba:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            imageName: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Küldött adat:", formData);

        const data = new FormData();
        data.append("header", formData.header);
        data.append("date", formData.date);
        data.append("typeId", formData.typeId);
        data.append("place", formData.place);
        data.append("description", formData.description);

        if (formData.imageName) {
            data.append("imageName", formData.imageName);
        }

        fetch("http://127.0.0.1:8000/api/forum/store", {
            method: "POST",
            body: data
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error("Hiba a mentés során");
            }

            setFormData({
                header: "",
                date: "",
                typeId: "",
                place: "",
                description: "",
                imageName: null,
            });

            setAnswer("Sikeres mentés!");
        })
        .catch(error => {
            console.error(error);
            setAnswer("Hiba a mentés során!");
        });
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
                    <Form.Label>Kép feltöltés:</Form.Label>
                    <Form.Control
                        type="file"
                        name="imageName"
                        onChange={handleFileChange}
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