import { Row, Col, Button } from "react-bootstrap";
import api, { isAdmin } from "../../../Login/api";

export default function ViewOneExamType(props) {
    const userIsAdmin = isAdmin();

    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a vizsgatípust?");
        if (!confirmDelete) return;

        api.delete(`examType/delete/${props.id}`)
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
                <Col lg={6} md={6} sm={12}>
                    <p className="mb-0"><strong>{props.typeName}</strong></p>
                </Col>

                <Col lg={4} md={6} sm={12} className="text-center">
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