import { useState } from "react";
import { Navbar, Nav, Offcanvas, Button } from "react-bootstrap";
import "./LoggedInLayout.css";

function LoggedInLayout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleToggle = () => setShow(!show);

  return (
    <>
      {!show && (
        <Button
          variant="danger"
          className="mobile-toggle-btn d-lg-none"
          onClick={handleToggle}
        >
          ☰
        </Button>
      )}

      {/* Desktop */}
      <div className="d-none d-lg-flex">
        <Navbar
          bg="danger"
          variant="dark"
          className="sidebar-desktop flex-column vh-100 start-0 top-0 p-3 shadow"
        >
          <Navbar.Brand className="mb-4 fw-bold text-center w-100">
            Tűzoltóság
          </Navbar.Brand>

          <Nav className="flex-column w-100">
            <Nav.Link href="#" className="sidebar-link">
              Beosztás
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link">
              Naptár
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link">
              Dolgozók
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link">
              Beállítások
            </Nav.Link>
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

      {/* Mobile */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h5 className="m-0">Tűzoltóság</h5>

          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        <Offcanvas.Body className="sidebar-mobile-body d-flex flex-column">
          <Nav className="flex-column gap-3">
            <Nav.Link href="#" className="sidebar-link" onClick={handleClose}>
              Beosztás
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link" onClick={handleClose}>
              Naptár
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link" onClick={handleClose}>
              Dolgozók
            </Nav.Link>
            <Nav.Link href="#" className="sidebar-link" onClick={handleClose}>
              Beállítások
            </Nav.Link>
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
    </>
  );
}

export default LoggedInLayout;