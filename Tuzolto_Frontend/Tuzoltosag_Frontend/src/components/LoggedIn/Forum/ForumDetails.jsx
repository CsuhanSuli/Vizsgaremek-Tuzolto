import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import LoggedInLayout from "../LoggedInLayout";
import api, { isAdmin } from "../../Login/api";

export default function ForumDetails() {
    const location = useLocation();
    const props = location.state;
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    const handleUpdate = () => {
        navigate(`/EditForum/${props.id}`, { state: props });
    };

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a bejegyzést?");
        if (!confirmDelete) return;

        api.delete(`forum/delete/${props.id}`)
            .then(() => {
                navigate('/Forum');
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (!props) {
        return (
            <LoggedInLayout>
                <p>Adatok betöltése sikertelen...</p>
                <Button onClick={() => navigate('/Forum')}>Vissza a fórumhoz</Button>
            </LoggedInLayout>
        );
    }

    return (
        <LoggedInLayout>
            <Row className="mt-4">
                <Col lg={8} md={12} sm={12}>
                    <h3><strong>{props.header}</strong></h3>
                    <hr />
                    <h5><strong>Típus:</strong> {props.typeName}</h5>
                    <h5><strong>Helyszín:</strong> {props.place}</h5>
                    <p className="mt-3"><strong>Leírás:</strong></p>
                    <p style={{ whiteSpace: "pre-wrap" }}>{props.description}</p>
                </Col>
                
                <Col lg={4} md={12} sm={12} className="d-flex flex-column align-items-center mt-lg-5">
                    {userIsAdmin && (
                        <>
                            <Button 
                                style={{ width: "250px" }} 
                                className="mb-2" 
                                variant="secondary" 
                                onClick={handleUpdate}
                            >
                                Módosítás
                            </Button>
                            <Button 
                                style={{ width: "250px" }} 
                                className="mb-2" 
                                variant="danger" 
                                onClick={deleteClick}
                            >
                                Törlés
                            </Button>
                        </>
                    )}
                    <Button 
                        style={{ width: "250px" }} 
                        variant="outline-primary" 
                        onClick={() => navigate('/Forum')}
                    >
                        Vissza
                    </Button>
                </Col>                
            </Row>
        </LoggedInLayout>
    );
}