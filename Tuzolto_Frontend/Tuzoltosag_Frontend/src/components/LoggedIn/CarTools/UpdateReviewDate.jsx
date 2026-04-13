import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import api from "../../Login/api";
import "./ReviewDate.css";

export default function UpdateReviewDate() {
    const location = useLocation();
    const navigate = useNavigate();
    const props = location.state || {};

    const [formData, setFormData] = useState({
        reviewDate: props.reviewDate || "",
        isHappend: Number(props.isHappend) === 1 ? 1 : 0,
        isSuccesfull: Number(props.isSuccesfull) === 1 ? 1 : 0,
        toolId: props.toolId
    });

    const [answer, setAnswer] = useState("");

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === "checkbox" ? (checked ? 1 : 0) : value;

        setFormData(prev => {
            let updatedData = { ...prev, [name]: newValue };
            if (name === "isHappend" && newValue === 0) {
                updatedData.isSuccesfull = 0;
            }
            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        api.put(`review/put/${props.id}`, formData)
            .then(() => {
                const returnState = { 
                    ...props, 
                    id: props.toolId 
                };
                navigate(`/CarToolDetails/${props.toolId}`, { state: returnState });
            })
            .catch(error => {
                console.error(error);
                setAnswer("Hiba történt a módosítás mentésekor!");
            });
    };

    return (
        <LoggedInLayout>
            <h1>Legutóbbi dátum módosítása</h1>
            <Form onSubmit={handleSubmit} className="formCenter">
                <Form.Group className="mb-3">
                    <Form.Label>Dátum</Form.Label>
                    <Form.Control 
                        required 
                        type="date"
                        name="reviewDate"
                        value={formData.reviewDate}
                        onChange={handleChange}
                    />
                </Form.Group>      
                
                <Form.Group className="mb-3 checkMargin">
                    <Form.Check 
                        type="checkbox" 
                        label="Megtörtént"
                        name="isHappend"
                        checked={formData.isHappend === 1}
                        onChange={handleChange}
                        className="strong-checkbox"
                    />
                </Form.Group>

                <Form.Group className="mb-3 checkMargin">
                    <Form.Check 
                        type="checkbox" 
                        label="Sikeres volt"
                        name="isSuccesfull"
                        checked={formData.isSuccesfull === 1}
                        onChange={handleChange}
                        disabled={formData.isHappend === 0}
                        className="strong-checkbox"
                    />
                </Form.Group>
                
                <Button type="submit" variant="danger">Frissítés</Button>
            </Form>
            {answer && <div className="mt-3 text-danger text-center">{answer}</div>}
        </LoggedInLayout>
    );
}