import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import './mission.css'

function ViewOneMission({mission}) {
    const {
        header,
        date,
        place,
        description,
        imageName,
        forum_type,
    } = mission


    return (<>
        
        <Container>
            <Row className="mission">
                <Col lg={5} md = {5}>
                    <img src={imageName} alt={header} />
                </Col>
                <Col lg={6} md = {6}>
                    <h3>{header}</h3>
                    <p><strong>Dátum:</strong> {date}</p>
                    <p><strong>Típusa:</strong> {forum_type.typeName}</p>
                    <p><strong>Helyszín:</strong> {place}</p>
                    <p className="description">{description}</p>

                </Col>
                <Col  lg={1} md = {1}></Col>
                <hr />
            </Row>
        </Container>
{/*
        <Container>
            <Row>
                <Col><img src={imageName} alt={header} /></Col>
                <Col>
                    <h2>{header}</h2>
                    <p><strong>Dátum:</strong> {date}</p>
                    <p><strong>Típusa:</strong> {forum_type.typeName}</p>
                    <p><strong>Helyszín:</strong> {place}</p>
                    <p className="description">{description}</p>
                </Col>
                <Col></Col>
            </Row>
        </Container>*/}
    </>)
}
export default ViewOneMission;