import { Row, Col, Button } from "react-bootstrap";
import "./Exams.css"
export default function ViewOneExam(props) {
    
    return(
        <>

            <Row className="row">
                <Col lg={6} md={6} sm={12}>
                    <p><strong>Vizsga Neve</strong></p>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <p>{props.examDate}</p>
                </Col>
                <br />
                <hr />
            </Row>
        </>
    )

}