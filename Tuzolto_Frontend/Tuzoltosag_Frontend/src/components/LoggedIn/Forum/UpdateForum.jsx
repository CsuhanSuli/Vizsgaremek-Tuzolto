import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./Forum.css";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

export default function UpdateForum() {
    const location = useLocation();
    const navigate = useNavigate();
    const props = location.state;

    const [type, setType] = useState([]);
    const [answer, setAnswer] = useState("");

    const [formData, setFormData] = useState({
        header: props?.header || "",
        date: props?.date || "",
        typeId: props?.typeId || "",
        place: props?.place || "",
        description: props?.description || "",
        imageName: props?.imageName || "",
    });

    useEffect(() => {
        api.get("forumType/index")
            .then((response) => setType(response.data))
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

        const data = new FormData();
        data.append("_method", "PUT");
        data.append("header", formData.header);
        data.append("date", formData.date);
        data.append("typeId", formData.typeId);
        data.append("place", formData.place);
        data.append("description", formData.description);

        if (formData.imageName instanceof File) {
            data.append("imageName", formData.imageName);
        } else {
            data.append("imageName", formData.imageName);
        }

        api.post(`forum/put/${props.id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(() => {
            setAnswer("Sikeres mentés!");
            setTimeout(() => navigate("/Forum"), 2000);
        })
        .catch((error) => {
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
                    <Form.Label>Kép neve / feltöltése:</Form.Label>
                    <Form.Control
                        type="text"
                        name="imageName"
                        value={typeof formData.imageName === 'string' ? formData.imageName : ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button type="submit" variant="danger">
                        Mentés
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