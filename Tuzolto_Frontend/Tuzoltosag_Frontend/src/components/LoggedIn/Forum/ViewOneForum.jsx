import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import api, { isAdmin } from "../../Login/api";

export default function ViewOneForum(props) {
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    const detailNavigate = () => {
        navigate(`/ForumDetails/${props.id}`, { state: props });
    };

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a bejegyzést?");
        if (!confirmDelete) return;

        api.delete(`forum/delete/${props.id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Row className="mb-3 align-items-center">
                <Col lg={3} md={6} sm={12}>
                    <p className="mb-0"><strong>{props.header}</strong></p>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <p className="mb-0">{props.typeName}</p>
                </Col>
                <Col lg={2} md={6} sm={12}>
                    <p className="mb-0">{props.date}</p>
                </Col>
                <Col lg={4} md={6} sm={12} className="text-center">
                    <Button 
                        className="me-2" 
                        variant="secondary"
                        onClick={detailNavigate}
                    >
                        Részletek
                    </Button>
                    {userIsAdmin && (
                        <Button 
                            variant="danger"
                            onClick={deleteClick}
                        >
                            Törlés
                        </Button>
                    )}
                </Col>
            </Row>
            <hr />
        </>
    );
}