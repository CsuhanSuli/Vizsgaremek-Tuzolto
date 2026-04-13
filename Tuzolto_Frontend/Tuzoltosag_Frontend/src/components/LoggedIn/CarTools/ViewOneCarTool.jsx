import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api, { isAdmin } from "../../Login/api";
import "./CarTools.css";

export default function ViewOneCarTool(props) {
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    const handleClick = () => {
        navigate(`/editCarTool/${props.id}`, { state: props });
    };

    const detailNavigate = () => {
        navigate(`/carToolDetails/${props.id}`, { state: props });
    };

    const deleteClick = () => {
        if (!window.confirm("Biztosan törli ezt az eszközt?")) return;

        api.delete(`tools/delete/${props.id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error("Hiba a törlés során:", error);
            });
    };

    return (
        <> 
            <Row className="mb-3 align-items-center">
                <Col lg={3} md={6} sm={12}>
                    <p><strong>{props.name}</strong></p>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <p>{props.place}</p>
                </Col>
                <Col lg={2} md={6} sm={12}>
                    <p>{props.reviewDate}</p>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <Button 
                        className="me-2" 
                        variant="secondary" 
                        onClick={detailNavigate}
                    >
                        Részletek
                    </Button>
                    
                    {userIsAdmin && (
                        <>
                            <Button 
                                className="me-2" 
                                variant="primary" 
                                onClick={handleClick}
                            >
                                Módosítás
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={deleteClick}
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