import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

function NewExam() {

    const location = useLocation();
    const props = location.state;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        examType: "",
    });

    const [answer, setAnswer] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/exams/store",{
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formData),

        })
        .then(() => {
            console.log(formData)
            setFormData({
                name: "",
                examType: "",
            })
            setAnswer("Sikeres mentés!")
        })
        .catch(error => {
            console.log(formData)
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })

    }
    const [examTypes, setExamTypes] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/examType/index")
        .then((response) => response.json())
        .then((data) => setExamTypes(data))
        .catch((error) => console.error(error));
    }, [])

    return(
        <>
            <LoggedInLayout>
                <h1>Új vizsga hozzáadása</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Vizsga neve:</Form.Label>
                        <Form.Control
                            require
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Vizsga típusa:</Form.Label>
                        <Form.Select
                            name="examType"
                            value={formData.examType}
                            onChange={handleChange}
                        >
                            <option value="" disabled>---Válasszon!---</option>
                            {examTypes.map((props) => (
                                <option key={props.id} value={props.id}>
                                    {props.typName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button disabled={!formData.examType} type="submit" variant="danger" onClick={handleSubmit}>Hozzáadás</Button>
                </Form>
                {answer && <div>{answer}</div>}
            </LoggedInLayout>
        </>
    )


}

export default NewExam;