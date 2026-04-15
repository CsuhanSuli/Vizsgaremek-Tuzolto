import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateUserExam() {
    const location = useLocation();
    const props = location.state;
    const navigate = useNavigate();

    const [exams, setExams] = useState([]);
    const [answer, setAnswer] = useState("");
    const [formData, setFormData] = useState({
        examId: props.examId,
        userId: props.userId || "",
        examDate: props.examDate || "",
        wasSuccesful: props.wasSuccesful ?? 0
    });

    useEffect(() => {
        api.get("exam/index")
            .then((response) => setExams(response.data))
            .catch((error) => console.error(error));

        if (props) {
            setFormData({
                examId: props.examId,
                userId: props.userId || "",
                examDate: props.examDate || "",
                wasSuccesful: props.wasSuccesful ?? 0
            });
        }
    }, [props]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!props?.id) {
            setAnswer("Hiba: Nincs azonosító a módosításhoz!");
            return;
        }

        api.put(`/examUser/put/${props.id}`, formData)
            .then(() => {
                setAnswer("Sikeres mentés!");

                setTimeout(() => {
                    navigate(`/Users`);
                }, 1000);
            })
            .catch(error => {
                console.error(error);
                setAnswer("Hiba a mentés során!");
            });
    };

    const getYesterday = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return today.toISOString().split("T")[0];
    };

    return (
        <LoggedInLayout>
            <h1>Vizsga módosítása</h1>
            <Form onSubmit={handleSubmit} className="formCenter">

                <Form.Group className="mb-3">
                    <Form.Label>Dátum</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="examDate"
                        value={formData.examDate}
                        onChange={handleChange}
                        max={getYesterday()}
                    />
                </Form.Group>

                <Form.Group className="mb-3 checkMargin">
                    <Form.Check 
                        type="checkbox" 
                        label="Sikeres volt"
                        name="wasSuccesful"
                        checked={formData.wasSuccesful === 1}
                        onChange={handleChange}
                        className="strong-checkbox"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="d-block">Vizsga</Form.Label>
                    {exams.length > 0 ? (
                        exams.map((item) => (
                            <Form.Check
                                type="radio"
                                key={item.id}
                                name="examId"
                                id={`exam-${item.id}`}
                                value={item.id}
                                label={item.name}
                                checked={String(formData.examId) === String(item.id)}
                                onChange={handleChange}
                                className="checkMargin"
                                required
                            />
                        ))
                    ) : (
                        <p className="text-muted">Nincsenek elérhető vizsgák.</p>
                    )}
                </Form.Group>

                <Button 
                    type="submit" 
                    variant="danger" 
                >
                    Módosítás mentése
                </Button>
            </Form>
            {answer && (
                <div className={`mt-4 alert ${answer.includes('Hiba') ? 'alert-danger' : 'alert-success'} text-center`}>
                    {answer}
                </div>
            )}
        </LoggedInLayout>
    );
}