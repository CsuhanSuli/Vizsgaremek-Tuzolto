import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ViewOneCar(props) {

    
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt az autót?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/car/delete/${props.id}`, {
            method: "DELETE"
        })
            .then(() => window.location.reload())
            .catch(error => {console.error(error)});
    }

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/UpdateCar/${props.id}`, {state: props})
    }

    return(
        <>

            <Row className="row">
                <Col lg={4} md={6} sm={12}>
                    <p><strong>{props.name}</strong></p>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <p><strong>{props.typemame}</strong></p>
                </Col> 
                <Col lg={4} md={6} sm={12}>
                    <Button onClick={handleNavigate} variant="secondary">Módosítás</Button>
                    <Button style={{ marginLeft: "2%" }} onClick={deleteClick} variant="danger">Törlés</Button>
                </Col>
                <br />
                <hr />
            </Row>
        </>
    )

}