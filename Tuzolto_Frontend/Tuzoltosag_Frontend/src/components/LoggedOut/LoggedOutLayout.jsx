import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./LoggedOutLayout.css"
const LoggedOutLayout = ({children}) => {
    return (
      <>


      <header>
        <Container>
          <Row>
            <Col lg={3} md={3}><img className='headerImg' src="transparentLogo.png" alt="" /></Col>
            <Col lg={9} md={9}><h1>Önkormányzati Tűzoltóság Balatonboglár-Balatonlelle Köztestülete</h1></Col>
          </Row>
        </Container>
      </header>



      <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand  className='linkColor ' href="http://localhost:5173">Kezdőlap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='linkColor' href="http://localhost:5173/FireFighters">Rólunk</Nav.Link>
            <Nav.Link className='linkColor' href="http://localhost:5173/Cars">Autóink</Nav.Link>
            <Nav.Link className='linkColor' href="#contacts">Elérhetőségeink</Nav.Link>
          </Nav>
          <Nav>
            <button className='loginBtn' type="button" href="http://localhost:5173/Login">Bejelentkezés</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <main>
        <Container>
          <Row>
            {children}
          </Row>
        </Container>
      </main>
      
      <footer>
        <Container>
          <Col/>
          <Col>
            <p className='attention'><strong>Vészhelyzet esetén hívj a 112-t!</strong></p>
            <p> <strong>Cím:</strong> 8630 Balatonboglár Klapka Gy. utca 9<br />
                <strong>Telefonszám:</strong> +36 85/550-960<br />
                <strong>Email:</strong> bbtuzoltosag@gmail.com
            </p>
            <a href="https://www.facebook.com/p/%C3%96nkorm%C3%A1nyzati-T%C5%B1zolt%C3%B3s%C3%A1g-Balatonbogl%C3%A1r-Balatonlelle-100071214001795/?locale=hu_HU" target='_blank'><img className='fb_logo' src="fb_logo_transparent.png" alt="" /></a>
          </Col>
            <Col/>
        </Container>
      </footer>

</>

    )
}

export default LoggedOutLayout