import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import "./ReviewDate.css"

export default function NewReviewDate() {
   const location = useLocation()
    const props = location.state;

    const [formData, setFormData] = useState({
        reviewDate: props.reviewDate,
        isHappend: props.isHappend,
        isSuccesfull: props.isSuccesfull,
        toolId: props.toolId
    })

    const [answer, setAnswer] = useState("")

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value
        });
    }

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
            console.log(setFormData)
            setFormData({
                reviewDate: "",
                isHappend: 0,
                isSuccesfull: 0,
                toolId: props.id
            })
            setAnswer("Sikeres mentés!")
            
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
                        value={formData.reviewDate}
                        checked={formData.isHappend === 1}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3 checkMargin">
                    <Form.Check 
                        type="checkbox" 
                        label="Sikeres volt"
                        name="isSuccesfull"
                        value={formData.reviewDate}
                        checked={formData.isSuccesfull === 1}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" variant="danger">Hozzáadás</Button>
            </Form>
            {answer && <div>{answer}</div>}
            </LoggedInLayout>  
        </>
    )
}