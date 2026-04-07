import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";


function ViewOneCar({ car }) {
  const { name, imageName } = car;

  return (
    <>
        <Col className="d-flex justify-content-center mb-4">
          <Card style={{ width: "25rem" }}>
            <Card.Img variant="top" src={imageName}/>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
    </>
  );
}
export default ViewOneCar;
