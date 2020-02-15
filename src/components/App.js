import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Texas TOC</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <NavDropdown title="&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Season</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Game</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="main-view">
        <Row className="justify-content-center text-center gp">
          <Col>
            <h1 className="main-h1">Welcome to Texas TOC</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
