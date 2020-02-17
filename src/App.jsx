import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {Route, Switch} from 'react-router-dom';
import Home from './home/Home'
import LoginProxy from './login/LoginProxy'
import SeasonProxy from './season/SeasonProxy'
import CurrentGameProxy from './current-game/CurrentGameProxy'

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Texas TOC</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <NavDropdown title="&nbsp;&nbsp;&nbsp;User&nbsp;&nbsp;" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/login">Log In/Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              <NavDropdown.Item href="/season">Season</NavDropdown.Item>
              <NavDropdown.Item href="/current-game">Game</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="main-view">
        <Row className="justify-content-center text-center gp">
          <Col>
            <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route path="/login" component={LoginProxy}/>
              <Route path="/season" component={SeasonProxy}/>
              <Route path="/current-game" component={CurrentGameProxy}/>
            </Switch>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
