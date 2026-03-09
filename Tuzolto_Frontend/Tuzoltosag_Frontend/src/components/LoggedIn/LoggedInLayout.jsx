import { useEffect, useState } from "react";
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container, Row, Col } from "react-bootstrap";
import "./LoggedInLayout.css";
import { useNavigate } from "react-router-dom"

function LoggedInLayout({children}) {
  const [show, setShow] = useState(false);
  const [car, setCar] = useState([]);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleToggle = () => setShow(!show);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/car/get")
      .then((response) => response.json())
        .then((json) => setCar(json))
        .catch((error) => console.error(error));
  }, []); 



  return (
    <>
    <Container>
      <Row>
        <Col lg={3} md={1} sm={1} xs={1}>
      {!show && (
        <Button
          variant="danger"
          className="mobile-toggle-btn d-lg-none"
          onClick={handleToggle}
        >
          ☰
        </Button>
      )}

      <div className="d-none d-lg-flex">
        <Navbar
          bg="danger"
          variant="dark"
          className="sidebar-desktop flex-column vh-100 start-0 top-0 p-3 shadow"
        >
          <Navbar.Brand className="mb-4 fw-bold text-center w-100">
            <img src="transparentLogo.png" alt="Tűzoltóság" className="NavImg"/>
          </Navbar.Brand>

          <Nav className="flex-column w-100">
            <Nav.Link href="#" className="sidebar-link">
              Beosztás
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link">
              Dolgozók
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link">
              Beállítások
            </Nav.Link>
            <NavDropdown title="Autók" id="basic-nav-dropdown" className="sidebar-dropdown">
              {car.map((props) => (
                <NavDropdown.Item 
                  key={props.carId} 
                  id={props.carId} 
                  onClick={() => {
                    navigate(`/carTools/${props.id}`, {state:props})
                  }} 
                  >{props.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          <div className="mt-auto w-100">
            <hr className="border-light" />
            <button
              className="btn btn-outline-light w-100"
              onClick={() => console.log("Kijelentkezés")}
            >
              Kijelentkezés
            </button>
          </div>
        </Navbar>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h5 className="m-0">Tűzoltóság</h5>

          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        <Offcanvas.Body className="sidebar-mobile-body d-flex flex-column">
          <Nav className="flex-column gap-3">
            <Nav.Link href="#" className="sidebar-link" onClick={() => setShow(false)}>
              Beosztás
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link" onClick={() => setShow(false)}>
              Dolgozók
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link" onClick={() => setShow(false)}>
              Beállítások
            </Nav.Link>
            <NavDropdown title="Autók" id="basic-nav-dropdown" className="sidebar-dropdown">
              {car.map((props) => (
                <NavDropdown.Item 
                  key={props.carId} 
                  id={props.carId} 
                  onClick={() => {
                    navigate(`/carTools/${props.id}`, {state:props})
                    setShow(false)
                  }} 
                  >{props.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          <div className="mt-auto">
            <hr className="border-light" />
            <button
              className="btn btn-outline-light w-100"
              onClick={() => {
                handleClose();
                console.log("Kijelentkezés");
              }}
            >
              Kijelentkezés
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      </Col>
        <Col lg={9} md={11} sm={11} xs={11}>
          {children}
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default LoggedInLayout;