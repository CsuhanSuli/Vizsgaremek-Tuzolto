import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./LoggedInLayout.css";

class LoggedInLayout extends React.Component {
  render() {
    return (
      <div className="topnav">
        <Navbar
          fixed="top"
          expand="lg"
          bg="dark"
          variant="dark"
          className="topnav"
        >
          <Navbar.Brand href="">V-Canteen</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default LoggedInLayout;