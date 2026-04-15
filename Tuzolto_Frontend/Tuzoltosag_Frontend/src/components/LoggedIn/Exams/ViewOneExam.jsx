import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api, { isAdmin } from "../../Login/api";
import "./Exams.css";

export default function ViewOneExam(props) {
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    const handleChange = () => {
        navigate(`/UpdateUserExam/${props.id}`, { state: props });
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

    const getClassName = () => {
        return (props.wasSuccesful === 0 || props.wasSuccesful === "0") ? "not-successful" : "success";
    };

    return (
        <>
            <Row className={`mb-3 align-items-center p-2 rounded ${getClassName()}`}>
                <Col lg={4} md={6} sm={12}>
                    <p className="mb-0 fw-bold">
                        {props.examsName || "Vizsga"}
                    </p>
                </Col>

                <Col lg={4} md={3} sm={12}>
                    <p className="mb-0">{props.examDate}</p>
                </Col>

                <Col lg={4} md={3} sm={12} className="text-center">
                    {userIsAdmin && (
                        <div className="d-flex justify-content-center gap-2">
                            <Button 
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
                        </div>
                    )}
                </Col>
            </Row>
            <hr />
        </>
    );
}