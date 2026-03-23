import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

export default function NewReviewDate() {
    const location = useLocation();
    const props = location.state;
    const [formData, setFormData] = useState({
        reviewDate: "",
        isHappend: "",
        isSuccesfull:"",
        toolId: props.id,
    });

    const [answer, setAnswer] = useState("");
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/review/store/${props.id}`,{
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formData),

        })
        .then(() => {
            setFormData({
                name: "",
                placeId: "",
                carId: props.id,
            })
            setAnswer("Sikeres mentés!")
            navigate(`/carTools/${props.carId}`, {state: props})
        })
        .catch(error => {
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })

    }

    return(
        <>
        
        </>
    )
}