import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";


export default function NewUserExam() {

    const location = useLocation()
    const props = location.state;
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/index")
          .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch((error) => console.error(error));
      }, []); 

      const [exams, setExams] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/exam/index")
          .then((response) => response.json())
            .then((json) => setExams(json))
            .catch((error) => console.error(error));
      }, []); 

    const [formData, setFormData] = useState({
        examId: "",
        userId: "",
        examDate: "",
    })

    const [answer, setAnswer] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/examUser/store`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData),
        })
        .then(() => {
            console.log(formData)
            setFormData({
                examId: "",
                userId: "",
                examDate: "",
            })
            setAnswer("Sikeres mentés!")  
        })
        .catch(error => {
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })
    }

        const getYesterday = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);

        return today.toISOString().split("T")[0];
    };


    return(
        <>
        <LoggedInLayout>
            <h1>Új vizsga</h1>
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

                        {users.map((row) => (
                            <option key={row.id} value={row.id}>
                                {row.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vizsga</Form.Label>
                    {exams.map((item) => (
                        <Form.Check
                            type="radio"
                            key={item.id}
                            name="examId"
                            value={item.id}
                            label={item.name}
                            checked={formData.examId == item.id}
                            onChange={handleChange}
                            className="checkMargin"
                        />
                    ))}
                    
                </Form.Group>
                <Button type="submit" variant="danger">Hozzáadás</Button>
            </Form>
            {answer && <div className="formCenter">{answer}</div>}
            </LoggedInLayout>  
        </>
    )
}