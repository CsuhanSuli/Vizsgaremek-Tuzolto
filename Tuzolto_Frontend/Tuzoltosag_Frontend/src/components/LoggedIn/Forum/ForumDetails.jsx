import { useLocation, useNavigate } from "react-router-dom"
import { Row, Col, Button } from "react-bootstrap";
import LoggedInLayout from "../LoggedInLayout";

export default function ForumDetails() {

    const location = useLocation()
    const props = location.state;

    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate(`/EditForum/${props.id}`, {state:props})
    }

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a bejegyzést?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/forum/delete/${props.id}`, {
            method: "DELETE"
        })
            .then(() => navigate('/Forum'))
            .catch(error => {console.error(error)});
    }


    return(
        <>
        <LoggedInLayout>
            <Row className="row">
                
                <Col lg={8} md={12} sm={12}>
                    <h3><strong>{props.header}</strong></h3>
                    <h5><strong>Típus:</strong> {props.typeName}</h5>
                    <h5><strong>Helyszín:</strong> {props.place}</h5>
                    <p><strong>Leírás:</strong> <br /> {props.description}</p>
                </Col>
                <Col lg={4} md={6} sm={12} style={{ marginTop: "50px" }}>
                    <Button style={{ width: "250px" }} className="mb-2" variant="secondary" onClick={handleUpdate}>Módosítás</Button>
                    <Button style={{ width: "250px" }} className="mb-2" variant="danger" onClick={deleteClick}>Törlés</Button>
                </Col>                
            </Row>
    </LoggedInLayout>

        </>
    )
}