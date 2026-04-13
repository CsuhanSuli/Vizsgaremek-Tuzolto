import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";

export default function NewUserExam() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [exams, setExams] = useState([]);
    const [answer, setAnswer] = useState("");
    const [formData, setFormData] = useState({
        examId: "",
        userId: "",
        examDate: "",
    });

    useEffect(() => {
        api.get("user/index")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));

        api.get("exam/index")
            .then((response) => setExams(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post("examUser/store", formData)
            .then(() => {
                setFormData({
                    examId: "",
                    userId: "",
                    examDate: "",
                });
                setAnswer("Sikeres mentés!");
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
        <>
            <LoggedInLayout>
                <h1>Új vizsga hozzárendelése</h1>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Dolgozó</Form.Label>
                        <Form.Select
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>--- Válasszon dolgozót ---</option>
                            {users.map((row) => (
                                <option key={row.id} value={row.id}>
                                    {row.name}
                                </option>
                            ))}
                        </Form.Select>
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
                        disabled={!formData.examId || !formData.userId || !formData.examDate}
                    >
                        Hozzáadás
                    </Button>
                </Form>
                {answer && (
                    <div className="mt-4 alert alert-danger text-center">
                        {answer}
                    </div>
                )}
            </LoggedInLayout>
        </>
    );
}