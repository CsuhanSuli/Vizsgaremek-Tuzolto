import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";

function ViewOneCar({ car }) {
  const { name, imageName } = car;

  return (
    <>
      <Col lg={3} md={12} sm={12}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={imageName} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
export default ViewOneCar;
