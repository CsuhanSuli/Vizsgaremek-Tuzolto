import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api, { isAdmin } from "../../Login/api";

export default function ViewOneCar(props) {
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt az autót?");
        if (!confirmDelete) return;

        api.delete(`car/delete/${props.id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleNavigate = () => {
        navigate(`/UpdateCar/${props.id}`, { state: props });
    }

    return (
        <>
            <Row className="row mb-3 align-items-center">
                <Col lg={4} md={4} sm={12}>
                    <p><strong>{props.name}</strong></p>
                </Col>
                <Col lg={4} md={4} sm={12}>
                    <p>{props.typename}</p>
                </Col> 
                
                <Col lg={4} md={4} sm={12} className="text-end">
                    {userIsAdmin && (
                        <>
                            <Button 
                                onClick={handleNavigate} 
                                variant="secondary" 
                            >
                                Módosítás
                            </Button>
                            <Button 
                                style={{ marginLeft: "2%" }} 
                                onClick={deleteClick} 
                                variant="danger" 
                            >
                                Törlés
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
            <hr />
        </>
    );
}