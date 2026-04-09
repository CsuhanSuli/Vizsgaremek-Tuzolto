import { Row, Col, Button } from "react-bootstrap";
import "./Exams.css"
import { useNavigate } from "react-router-dom";
export default function ViewOneExam(props) {
    
    const navigate = useNavigate()

    const handleChange = () => {
        navigate(`/EditExam/${props.id}`, {state:props})
    }

    /*
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a vizsgát?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/id=${props.id}`)
            navigate(`/carToolDetails/${props.id}`, {state:props})
            .catch(error => {console.error(error)});
    }
    */

    return(
        <>

            <Row className="row">
                <Col lg={4} md={6} sm={12}>
                    <p><strong>Vizsga Neve</strong></p>
                </Col>

                <Col lg={4} md={6} sm={12}>
                    <p>{props.examDate}</p>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <Button className="editButton" onClick={handleChange} variant="primary">Módosítás</Button>
                    <Button variant="danger">Törlés</Button>
                </Col>
                <br />
                <hr />
            </Row>
        </>
    )

}