import { useNavigate } from "react-router-dom"
import { Row, Col, Button } from "react-bootstrap";

export default function ViewOneForum(props) {

    const navigate = useNavigate();
    const detailNavigate = () => {
        navigate(`/ForumDetails/${props.id}`, {state:props})
    }

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a bejegyzést?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/forum/delete/${props.id}`, {
            method: "DELETE"
        })
            .then(() => window.location.reload())
            .catch(error => {console.error(error)});
    }


    return(
        <>
            <Row className="row">
                <Col lg={3} md={6} sm={12}>
                    <p><strong>{props.header}</strong></p>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <p>{props.typeName}</p>
                </Col>
                <Col lg={2} md={6} sm={12}>
                    <p>{props.date}</p>
                </Col>
                <Col lg={4} md={6} sm={12} className="buttonsCol">
                    <Button  className="editButton" variant="secondary" onClick={detailNavigate}>Részletek</Button>
                    <Button variant="danger" onClick={deleteClick}>Törlés</Button>
                </Col>
                <br />
                <hr />
            </Row>

        </>
    )
}