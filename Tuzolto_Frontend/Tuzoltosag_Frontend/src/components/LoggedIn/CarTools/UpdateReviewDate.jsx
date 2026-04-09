import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import "./ReviewDate.css"

export default function UpdateReviewDate() {
   const location = useLocation()
    const props = location.state;
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        reviewDate: props.reviewDate,
        isHappend: 0,
        isSuccesfull: 0,
        toolId: props.id
    })

    const [answer, setAnswer] = useState("")

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        const newValue = type === "checkbox" ? (checked ? 1 : 0) : value;

        let updatedData = {
            ...formData,
            [name]: newValue
        };

        if (name === "isHappend" && newValue === 0) {
            updatedData.isSuccesfull = 0;
        }

        setFormData(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/review/store/${props.id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData),
        })
        .then(() => {
            navigate(`/CarToolDetails/${props.id}`, {state:props})
            
        })
        .catch(error => {
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })
    }


    return(
        <>
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
            {answer && <div>{answer}</div>}
            </LoggedInLayout>  
        </>
    )
}