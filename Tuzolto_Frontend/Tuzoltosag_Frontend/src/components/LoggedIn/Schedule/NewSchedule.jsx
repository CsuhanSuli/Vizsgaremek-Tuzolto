import { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Login/api"; // Az axios példányod
import LoggedInLayout from "../LoggedInLayout";
import "./Calendar.css"

export default function NewSchedule() {
    const location = useLocation();
    const props = location.state;
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [scheduleType, setScheduleType] = useState([]);
    const [answer, setAnswer] = useState("");

    const [formData, setFormData] = useState({
        scheduleTypeid: "",
        userId: "",
        date: "",
    });

    // Adatok betöltése api.get-tel
    useEffect(() => {
        api.get("user/index")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Hiba a dolgozók betöltésekor:", error));

        api.get("schedule_types")
            .then((response) => setScheduleType(response.data))
            .catch((error) => console.error("Hiba a típusok betöltésekor:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Használjuk az axios példányt (api.post) a fetch helyett
        api.post("schedule/store", formData)
            .then(() => {
                setFormData({
                    scheduleTypeid: "",
                    userId: "",
                    date: "",
                });
                setAnswer("Sikeres mentés!");
            })
            .catch(error => {
                console.error("Szerver hiba:", error.response);
                if (error.response?.status === 405) {
                    setAnswer("Hiba: A szerver nem engedélyezi ezt a műveletet (405)!");
                } else {
                    setAnswer("Hiba a mentés során!");
                }
            });
    };

    return (
        <LoggedInLayout>
            <Container className="py-4">
                <h1 className="text-center mb-4">Új beosztás dátum</h1>
                <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
                    
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Dátum</strong></Form.Label>
                        <Form.Control 
                            required 
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </Form.Group>      
                    
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Dolgozó</strong></Form.Label>
                        <Form.Select 
                            required
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                        >
                            <option value="">Válassz dolgozót...</option>
                            {users.map((row) => (
                                <option key={row.id} value={row.id}>
                                    {row.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label><strong>Beosztás típusa</strong></Form.Label>
                        <div className="d-flex flex-column gap-2 ms-2">
                            {scheduleType.map((item) => (
                                <Form.Check
                                    required
                                    type="radio"
                                    key={item.id}
                                    id={`new-radio-${item.id}`}
                                    name="scheduleTypeid"
                                    value={item.id}
                                    label={item.name}
                                    checked={String(formData.scheduleTypeid) === String(item.id)}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    
                    <div className="d-grid">
                        <Button type="submit" variant="danger" size="lg">
                            Hozzáadás
                        </Button>
                    </div>
                </Form>

                {answer && (
                    <div className={`mt-4 text-center alert ${answer.includes('Sikeres') ? 'alert-success' : 'alert-danger'}`}>
                        {answer}
                    </div>
                )}
            </Container>
        </LoggedInLayout>
    );
}