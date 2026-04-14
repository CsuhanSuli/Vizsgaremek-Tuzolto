import Col from "react-bootstrap/esm/Col";
import "./mission.css";
import LoggedOutLayout from "../LoggedOutLayout";

function ViewOneMission({ mission }) {
  const { header, date, place, description, imageName, forum_type } = mission;

  return (
    <>

        <Col className="mission" lg={4} md={12} sm={12}>
          <img className="missionImg" src={imageName} alt={header} />
        </Col>
        <Col lg={7} md={12} sm={12}>
          <h3>{header}</h3>
          <p>
            <strong>Dátum:</strong> {date}
          </p>
          <p>
            <strong>Típusa:</strong> {forum_type.typeName}
          </p>
          <p>
            <strong>Helyszín:</strong> {place}
          </p>
          <p className="description">
            {description}
          </p>
        </Col>
        <hr />

    </>
  );
}
export default ViewOneMission;
