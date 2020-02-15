import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {Route, Switch} from 'react-router-dom';
import Home from './Home'
import Season from './season/Season'
import CurrentGame from './current-game/CurrentGame'

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
              <Route path="/season" component={Season}/>
              <Route path="/current-game" component={CurrentGame}/>
            </Switch>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
