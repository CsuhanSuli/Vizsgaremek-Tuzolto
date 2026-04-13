import { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Login/api"; 
import LoggedInLayout from "../LoggedInLayout";
import "./Calendar.css";

export default function UpdateSchedule() {
    const location = useLocation();
    const props = location.state || {};
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [scheduleType, setScheduleType] = useState([]);
    const [answer, setAnswer] = useState("");
    
    const [formData, setFormData] = useState({
        scheduleTypeid: props.scheduleTypeid || props.schedule_type_id || "",
        userId: props.userId || props.user_id || "",
        date: props.date || "",
    });

    useEffect(() => {
        api.get("user/index").then(res => setUsers(res.data));
        api.get("schedule_types").then(res => setScheduleType(res.data));
    }, []);

    useEffect(() => {
        if (props) {
            setFormData({
                scheduleTypeid: props.scheduleTypeid || props.schedule_type_id || "",
                userId: props.userId || props.user_id || "",
                date: props.date || "",
            });
        }
    }, [users, scheduleType, props]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`schedule/put/${props.id}`, formData)
            .then(() => {
                setAnswer("Sikeres mentés!");
                setTimeout(() => {
                    navigate("/Calendar");
                }, 1000); 
            })
            .catch(error => {
                console.error(error);
                setAnswer("Hiba a mentés során!");
            });
    };

    const handleDelete = () => {
        if (!window.confirm("Biztosan törölni szeretnéd ezt a beosztást?")) return;
        api.delete(`schedule/delete/${props.id}`)
            .then(() => navigate("/Calendar"))
            .catch(() => setAnswer("Hiba történt a törlés során!"));
    };

    return (
        <LoggedInLayout>
            <Container className="py-4">
                <h1 className="text-center mb-4">Beosztás módosítása</h1>
                
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
                                    id={`radio-${item.id}`}
                                    name="scheduleTypeid"
                                    value={item.id}
                                    label={item.name}
                                    checked={formData.scheduleTypeid == item.id}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    
                    <div className="d-grid gap-3">
                        <Button type="submit" variant="danger" size="lg">Módosítás</Button>
                        <Button type="button" variant="warning" size="lg" onClick={handleDelete}>Törlés</Button>
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