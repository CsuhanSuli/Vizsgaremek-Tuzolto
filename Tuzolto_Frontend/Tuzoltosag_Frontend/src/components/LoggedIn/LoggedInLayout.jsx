import { useEffect, useState } from "react";
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container, Row, Col } from "react-bootstrap";
import "./LoggedInLayout.css";
import { useNavigate } from "react-router-dom";
import api, { getUser, isAdmin } from "../Login/api";

function LoggedInLayout({children}) {
  const [show, setShow] = useState(false);
  const [car, setCar] = useState([]);

  const navigate = useNavigate();
  const user = getUser();
  const userIsAdmin = isAdmin();

  const handleClose = () => setShow(false);
  const handleToggle = () => setShow(!show);

  useEffect(() => {
    api.get("car/get")
      .then((response) => setCar(response.data))
      .catch((error) => console.error("Hiba az autók betöltésekor:", error));
  }, []); 

  const handleLogout = async () => {
    try {
      await api.post("user/logout");
    } catch (error) {
      console.error("Logout hiba:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/Login"); 
    }
  };

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
              variant="dark"
              className="sidebar-desktop flex-column vh-100 start-0 top-0 p-3 shadow"
            >
              <Navbar.Brand className="mb-4 fw-bold text-center w-100">
                <img src="/transparentLogo.png" alt="Tűzoltóság" className="NavImg"/>
              </Navbar.Brand>

              <Nav className="flex-column w-100">
                <Nav.Link onClick={() => navigate("/Calendar")} className="sidebar-link">Beosztás</Nav.Link>
                <Nav.Link onClick={() => navigate(`/Exams/${user?.id}`)} className="sidebar-link">Vizsgáim</Nav.Link>

                <NavDropdown title="Autók szerszámai" id="desktop-car-dropdown" className="sidebar-dropdown">
                  {car.map((item) => (
                    <NavDropdown.Item key={item.id} 
                      onClick={() => {
                        navigate(`/CarTools/${item.id}`, {state:item});
                        window.location.reload();
                        }}>
                      {item.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>

                {userIsAdmin && (
                  <>
                    <NavDropdown title="Vizsgák" id="desktop-exams-dropdown" className="sidebar-dropdown">
                      <NavDropdown.Item onClick={() => navigate(`/NewExam`)}>Új vizsga</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => navigate(`/NewUserExam`)}>Új vizsga dolgozó</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => navigate(`/ExamType`)}>Vizsga típusok</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link onClick={() => navigate("/Users")} className="sidebar-link">Dolgozók</Nav.Link>

                    <NavDropdown title="Fórum" id="desktop-forum-dropdown" className="sidebar-dropdown">
                      <NavDropdown.Item onClick={() => navigate(`/Forum`)}>Fórum bejegyzések</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => navigate(`/ForumType`)}>Fórum típusok</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link onClick={() => navigate("/CarsLoggedIn")} className="sidebar-link">Autók</Nav.Link>
                    <Nav.Link onClick={() => navigate("/Registration")} className="sidebar-link">Regisztráció</Nav.Link>
                  </>
                )}
              </Nav>
              
              <div className="mt-auto w-100">
                <hr className="border-light" />
                <button className="btn btn-outline-light w-100" onClick={handleLogout}>Kijelentkezés</button>
              </div>
            </Navbar>
          </div>

          <Offcanvas show={show} onHide={handleClose} placement="start">
            <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
              <h5 className="m-0">Tűzoltóság</h5>
              <button className="close-btn" onClick={handleClose}>✕</button>
            </div>

            <Offcanvas.Body className="sidebar-mobile-body d-flex flex-column">
              <Nav className="flex-column gap-3">
                <Nav.Link className="sidebar-link" onClick={() => { navigate("/Calendar"); setShow(false); }}>Beosztás</Nav.Link>
                <Nav.Link className="sidebar-link" onClick={() => { navigate(`/Exams/${user?.id}`); setShow(false); }}>Vizsgáim</Nav.Link>
                
                <NavDropdown title="Autók szerszámai" id="mobile-car-dropdown" className="sidebar-dropdown">
                  {car.map((item) => (
                    <NavDropdown.Item key={item.id} 
                      onClick={() => {
                         navigate(`/CarTools/${item.id}`, {state:item}); 
                         setShow(false); 
                         window.location.reload();
                         }}>
                      {item.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>

                {userIsAdmin && (
                  <>
                    <NavDropdown title="Vizsgák" id="mobile-exams-dropdown" className="sidebar-dropdown">
                      <NavDropdown.Item onClick={() => { navigate(`/NewExam`); setShow(false); }}>Új vizsga</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate(`/NewUserExam`); setShow(false); }}>Új vizsga dolgozó</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate(`/ExamType`); setShow(false); }}>Vizsga típusok</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link className="sidebar-link" onClick={() => { navigate("/Users"); setShow(false); }}>Dolgozók</Nav.Link>

                    <NavDropdown title="Fórum" id="mobile-forum-dropdown" className="sidebar-dropdown">
                      <NavDropdown.Item onClick={() => { navigate(`/Forum`); setShow(false); }}>Fórum bejegyzések</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate(`/ForumType`); setShow(false); }}>Fórum típusok</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link className="sidebar-link" onClick={() => { navigate("/CarsLoggedIn"); setShow(false); }}>Autók</Nav.Link>
                    <Nav.Link className="sidebar-link" onClick={() => { navigate("/Registration"); setShow(false); }}>Regisztráció</Nav.Link>
                  </>
                )}
              </Nav>

              <div className="mt-auto">
                <hr className="border-light" />
                <button className="btn btn-outline-light w-100" onClick={handleLogout}>Kijelentkezés</button>
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