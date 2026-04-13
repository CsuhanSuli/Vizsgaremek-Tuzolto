import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import { Button, Col, Container, Row } from "react-bootstrap";
import api, { isAdmin } from "../../Login/api";

function ToolDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const userIsAdmin = isAdmin();
  
  const props = location.state || {};
  const toolId = props.toolId || props.id;

  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (!toolId) return;

    api.get(`review/allDates/${toolId}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => console.error(error));
  }, [toolId, location.key]);

  const latestReview = details.length > 0 ? details[details.length - 1] : null;

  const handleNewDate = () => {
    navigate(`/newReviewDate/${toolId}`, { state: { ...props, id: toolId } });
  };

  const handleUpdateDate = () => {
    if (!latestReview) return;

    navigate(`/updateReviewDate/${latestReview.id}`, { 
      state: { 
        ...props,
        id: latestReview.id,
        toolId: toolId,
        reviewDate: latestReview.reviewDate,
        isHappend: latestReview.isHappend,
        isSuccesfull: latestReview.isSuccesfull
      } 
    });
  };

  const getClassName = (row) => {
    if (row.isHappend === 0) return "not-happened";
    if (row.isSuccesfull === 0 && row.isHappend === 1) return "not-successful";
    return "success";
  };

  const handleDelete = () => {
    if (!latestReview) return;

    if (!window.confirm("Biztosan törölni szeretnéd az utolsó felülvizsgálati dátumot?")) return;

    api.delete(`review/delete/${latestReview.id}`)
      .then(() => {
        setDetails(details.filter(item => item.id !== latestReview.id));
        alert("Sikeres törlés!");
      })
      .catch((error) => {
        console.error(error);
        alert("Hiba történt a törlés során!");
      });
  };


  return (
    <LoggedInLayout>
      <Container>
        <Row>
          <Col lg={7} md={6} sm={12}>
            <h3><strong>{props?.name}</strong></h3>
            <br />
            <h5><strong>Helye: </strong>{props?.place}</h5>
            <br />
            <h6><strong>Felülvizsgálatok:</strong></h6>
            <ul>
              {details.map((row) => (
                <li className={getClassName(row)} key={row.id}>
                  {row.reviewDate}
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={5} md={6} sm={12} style={{ marginTop: "50px" }}>
            {userIsAdmin && (
              <>
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
                  disabled={!latestReview}
                >
                  Legutóbbi dátum módosítása
                </Button>
                <br />
                <Button
                  style={{ width: "250px" }}
                  className="mb-2"
                  variant="danger"
                  onClick={handleDelete}
                >
                  Legutóbbi törlése
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </LoggedInLayout>
  );
}

export default ToolDetails;