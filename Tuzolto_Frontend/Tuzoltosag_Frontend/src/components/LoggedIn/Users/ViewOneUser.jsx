import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Users.css"


export default function ViewOneUser(props) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/EditUser/${props.id}`, {state:props})
    }

    const examNavigate = () => {
        navigate(`/Exams/${props.id}`, {state:props})
    }


    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a felhasználót?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/user/delete/${props.id}`, {
            method: "DELETE"
        })
            .then(() => window.location.reload())
            .catch(error => {console.error(error)});
    }

    const Admin = () => {
        if(props.isAdmin == 1)
            return "Admin"
        else return "Nem Admin"
    } 

    const FortyHour = () => {
        if(props.fortyHours == 1)
            return "Megvan a 40 óra"
        else return "Nincs meg a 40 óra"
    } 

    return (
        <> 
            <Row className="row">
                <Col lg={2} md={6} sm={12}>
                    <p><strong>{props.name}</strong></p>
                </Col>
                <Col lg={2} md={6} sm={12}>
                    <p>{props.email}</p>
                </Col>
                <Col lg={2} md={6} sm={12}>
                    <p>{FortyHour()}</p>
                </Col>
                <Col lg={2} md={6} sm={12}>
                    <p>{Admin()}</p>
                </Col>
                <Col lg={4} md={6} sm={12} className="buttonsCol">
                    <Button  className="editButton" variant="secondary" onClick={examNavigate}>Vizsgák</Button>
                    <Button className="editButton" variant="primary" onClick={handleClick}>Módosítás</Button>
                    <Button variant="danger" onClick={deleteClick}>Törlés</Button>
                </Col>
                <br />
                <hr />
            </Row>

        </>
    )
}