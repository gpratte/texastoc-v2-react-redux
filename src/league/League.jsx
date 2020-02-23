import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home'
import Login from '../login/components/Login'
import Season from '../season/components/Season'
import CurrentGame from '../current-game/components/CurrentGame'

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
                <NavDropdown.Item href="/login">Log In/Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title="&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/home">Home</NavDropdown.Item>
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
                <Route
                  exact path='/'
                  render={(props) => <Home token={this.props.league.token}/>}
                />
                <Route
                  path='/home'
                  render={(props) => <Home token={this.props.league.token}/>}
                />
                <Route
                  path='/login'
                  render={(props) => <Login token={this.props.league.token}/>}
                />
                <Route
                  path='/season'
                  render={(props) => <Season token={this.props.league.token} season={this.props.league.season}/>}
                />
                <Route
                  path='/current-game'
                  render={(props) => <CurrentGame token={this.props.league.token} game={this.props.league.game}/>}
                />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default League
