import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import { Button, Col, Container, Row } from "react-bootstrap";


function ToolDetails() {
  const location = useLocation();
  const props = location.state;

  const navigate = useNavigate()

  const handleNewDate = () => {
    navigate(`/newReviewDate/${props.id}`, {state:props})
  }

  const handleUpdateDate = () => {
    navigate(`/updateReviewDate/${props.id}`, {state:props})
  }

  const [details, setDeatils] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/review/allDates/${props.id}`)
      .then((response) => response.json())
      .then((json) => {
        setDeatils([json]);
      })
      .catch((error) => console.error(error));
  }, []);

  const getClassName = (row) => {
    if (row.isHappend === 0) return "not-happened";
    if (row.isSuccesfull === 0) return "not-successful";
    return "success";
  };

  /*
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli a dátumot?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/id=${props.id}`)
            navigate(`/carToolDetails/${props.id}`, {state:props})
            .catch(error => {console.error(error)});
    }*/

  return (
    <>
      <LoggedInLayout>
        <Container>
          <Row>
            <Col lg={7} md={6} sm={12}>
              <h3>
                <strong>{props.name}</strong>
              </h3>
              <br />
              <h5>
                <strong>Helye: </strong>
                {props.place}
              </h5>
              <br />
              <h6>
                <strong>Felülvizsgálatok:</strong>
              </h6>
              <ul>
                {details.map((row) => (
                  <li className={getClassName(row)} key={row.id} id={row.id}>
                    {row.reviewDate}
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={5} md={6} sm={12} style={{ marginTop: "50px" }}>
              <Button
                style={{ width: "250px" }}
                className="mb-2"
                variant="primary"
                onClick={handleNewDate}
              >
                Új ellenőrzés dátum
              </Button>
              <br />
              <Button
                style={{ width: "250px" }}
                className="mb-2"
                variant="secondary"
                onClick={handleUpdateDate}
              >
                Legutóbbi dátum módosítása
              </Button>
              <br />
              <Button
                style={{ width: "250px" }}
                className="mb-2"
                variant="danger"
              >
                Legutóbbi törlése
              </Button>
              <br />
            </Col>
          </Row>
        </Container>
      </LoggedInLayout>
    </>
  );
}

export default ToolDetails;
