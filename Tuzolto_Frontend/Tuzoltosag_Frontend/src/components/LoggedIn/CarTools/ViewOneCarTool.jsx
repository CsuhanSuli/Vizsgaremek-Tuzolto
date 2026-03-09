import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import LoggedInLayout from "../LoggedInLayout";
import "./CarTools.css"

export default function ViewOneCarTool(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/editCarTool/${props.id}`, {state:props})
    }
    /*
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt az eszközt?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/id=${props.id}`)
            .then(navigate('/carTools'))
            .catch(error => {console.error(error)});
    }*/

    return (
        <> 
            <Row className="row">
                <Col lg={3} md={6} sm={12}>
                    <p><strong>{props.name}</strong></p>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <p>{props.place}</p>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <p>Dátum</p>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <Button variant="danger">Törlés</Button>
                    <Button variant="primary" onClick={handleClick}>Módosítás</Button>
                    {/*<Button onClick={deleteClick}>Törlés</Button>*/}
                </Col>
                <hr />
                </Row>

        </>
    )
}