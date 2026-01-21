import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./LogoutLayout.css"
const LogoutLayout = ({children}) => {
    return (
      <>


      <header>
        <Container>
          <Row>
            <Col lg={3} md = {3}><img className='headerImg' src="transparentLogo.png" alt="" /></Col>
            <Col lg={9} md = {9}><h1>Önkormányzati Tűzoltóság Balatonboglár-Balatonlelle Köztestülete</h1></Col>
          </Row>
        </Container>

      </header>



      <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand  className='linkColor ' href="http://localhost:5173/Home"><img src="" alt="" />Kezdőlap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='linkColor' href="http://localhost:5173/FireFighters">Rólunk</Nav.Link>
            <Nav.Link className='linkColor' href="http://localhost:5173/Cars">Autóink</Nav.Link>
            <Nav.Link className='linkColor' href="#contacts">Elérhetőségeink</Nav.Link>
          </Nav>
          <Nav>
            {/*<Nav.Link className='loginBtn' href="http://localhost:5173/Login">Bejelentkezés</Nav.Link>*/}
            <button className='loginBtn' type="button" href="http://localhost:5173/Login">Bejelentkezés</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <main>
        {children}
      </main>


</>

    )
}

export default LogoutLayout