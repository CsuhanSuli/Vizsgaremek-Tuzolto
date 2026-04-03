import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import "./Calendar.css"


export default function NewSchedule() {

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

      const [scheduleType, setScheduleType] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/scheduleType/index")
          .then((response) => response.json())
            .then((json) => setScheduleType(json))
            .catch((error) => console.error(error));
      }, []); 

    const [formData, setFormData] = useState({
        scheduleTypeid: 0,
        userId: 0,
        date: "",
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
        fetch(`http://127.0.0.1:8000/api/schedule/store`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData),
        })
        .then(() => {
            console.log(formData)
            setFormData({
                scheduleTypeid: 0,
                userId: 0,
                date: "",
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
            <h1>Új beosztás dátum</h1>
            <Form onSubmit={handleSubmit} className="formCenter">
                <Form.Group className="mb-3">
                    <Form.Label>Dátum</Form.Label>
                    <Form.Control 
                        required 
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </Form.Group>      
                
                <Form.Group className="mb-3">
                    <Form.Label>Dolgozó</Form.Label>
                    <Form.Select 
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                    >
                        {users.map((row) => (
                            <option key={row.id} value={row.id}>
                                {row.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Beosztás típusa</Form.Label>
                    {scheduleType.map((item) => (
                        <Form.Check
                            type="radio"
                            key={item.id}
                            name="scheduleTypeid"
                            value={item.id}
                            label={item.name}
                            checked={formData.scheduleTypeid == item.id}
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