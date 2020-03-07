import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home'
import Login from '../login/components/Login'
import Season from '../season/components/Season'
import CurrentGame from '../current-game/components/CurrentGame'
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';

class League extends React.Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">Texas TOC</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <NavDropdown title="&nbsp;&nbsp;&nbsp;User&nbsp;&nbsp;" id="collasible-nav-dropdown">
                <LinkContainer exact to={"/login"}>
                  <NavLink>
                    <Button variant="link">Log In/Out</Button>
                  </NavLink>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title="&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;" id="collasible-nav-dropdown">
                <LinkContainer exact to={"/home"}>
                  <NavLink>
                    <Button variant="link">Home</Button>
                  </NavLink>
                </LinkContainer>
                <LinkContainer exact to={"/season"}>
                  <NavLink>
                    <Button variant="link">Season</Button>
                  </NavLink>
                </LinkContainer>
                <LinkContainer exact to={"/current-game"}>
                  <NavLink>
                    <Button variant="link">Game</Button>
                  </NavLink>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="main-view">
          <Row className="justify-content-center text-center gp">
            <Col>
              <Switch>
                <Route exact path='/'>
                  <Home league={this.props.league}/>
                </Route>
                <Route path='/home'>
                  <Home league={this.props.league}/>
                </Route>
                <Route path='/login'>
                  <Login token={this.props.league.token}/>
                </Route>
                <Route path='/season'>
                  <Season league={this.props.league}/>
                </Route>
                <Route path='/current-game'>
                  <CurrentGame league={this.props.league}/>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default League
