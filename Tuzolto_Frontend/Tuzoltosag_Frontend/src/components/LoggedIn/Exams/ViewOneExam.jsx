import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api, { isAdmin } from "../../Login/api";
import "./Exams.css";

export default function ViewOneExam(props) {
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    const handleChange = () => {
        navigate(`/EditExam/${props.id}`, { state: props });
    };

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a vizsgát?");
        if (!confirmDelete) return;

        api.delete(`examUser/delete/${props.id}`)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Row className="mb-3 align-items-center">
                <Col lg={4} md={6} sm={12}>
                    <p className="mb-0"><strong>{props.exam_type || "Vizsga"}</strong></p>
                </Col>

                <Col lg={4} md={6} sm={12}>
                    <p className="mb-0">{props.examDate}</p>
                </Col>

                <Col lg={4} md={6} sm={12} className="text-end">
                    {userIsAdmin && (
                        <>
                            <Button 
                                className="me-2" 
                                variant="primary"
                                onClick={handleChange}
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