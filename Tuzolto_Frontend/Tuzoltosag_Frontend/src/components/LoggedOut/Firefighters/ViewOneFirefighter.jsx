import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import "./firefighter.css"

function ViewOneFirefighter({ firefighter }) {
  const { header, imageName } = firefighter;

  return (
    <>
      <Col lg={3} md={12} sm={12}>
        <Card className="h-100 w-100" style={{ width: "18rem" }}>
          <Card.Img className="cardImg" variant="top" src={imageName} />
          <Card.Body>
            <Card.Title>{header}</Card.Title>
            <Card.Text>
              <strong>Beosztás: </strong> Százados
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
export default ViewOneFirefighter;
