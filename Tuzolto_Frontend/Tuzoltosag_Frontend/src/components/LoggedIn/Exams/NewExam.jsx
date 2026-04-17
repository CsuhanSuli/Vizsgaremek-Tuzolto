import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

function NewExam() {
    const location = useLocation();
    const props = location.state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        examType: "",
    });

    const [answer, setAnswer] = useState("");
    const [examTypes, setExamTypes] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        api.post("exams/store", formData)
            .then(() => {
                setFormData({
                    name: "",
                    examType: "",
                });
                setAnswer("Sikeres mentés!");
            })
            .catch(error => {
                console.error(error);
                setAnswer("Hiba a mentés során!");
            });
    };

    useEffect(() => {
        api.get("examType/index")
            .then((response) => setExamTypes(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <LoggedInLayout>
                <h1>Új vizsga hozzáadása</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Vizsga neve:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Vizsga típusa:</Form.Label>
                        <Form.Select
                            required
                            name="examType"
                            value={formData.examType}
                            onChange={handleChange}
                        >
                            <option value="" disabled>---Válasszon!---</option>
                            {examTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.typeName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button 
                        disabled={!formData.examType || !formData.name} 
                        type="submit" 
                        variant="danger"
                    >
                        Hozzáadás
                    </Button>
                </Form>
                {answer && <div className="mt-3">{answer}</div>}
            </LoggedInLayout>
        </>
    );
}

export default NewExam;