import Col from "react-bootstrap/esm/Col";
import "./mission.css";

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
          {description} <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Col>
      <hr />
    </>
  );
}
export default ViewOneMission;
