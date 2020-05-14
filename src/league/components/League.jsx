import React from 'react';
import './league.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import {Link, Route, Switch} from 'react-router-dom';
import Error from './Error'
import NewVersion from './NewVersion'
import Home from '../../home/Home'
import Login from '../../login/components/Login'
import ForgotPassword from '../../login/components/ForgotPassword'
import ForgotPasswordCode from '../../login/components/ForgotPasswordCode'
import Season from '../../season/components/Season'
import NewSeason from '../../season/components/NewSeason'
import CurrentGame from '../../current-game/components/CurrentGame'
import NewGame from '../../current-game/components/NewGame'
import LeaguePlayers from './LeaguePlayers'
import {LinkContainer} from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import leagueStore from "./../leagueStore";
import {GETTING_SEASON} from "../../season/seasonActions";
import {getCurrentSeason} from "../../season/seasonClient";
import {isLoggedIn, shouldShowGame} from "../../utils/util";
import {getPlayers, checkDeployedVersion} from "./../leagueClient";

class League extends React.Component {

  userIcon = <i className="fas fa-user-alt"/>
  barsIcon = <i className="fas fa-bars"/>
  homeIcon = <i className="fas fa-home"/>

  shouldInitialize = (league) => {
    const shouldInitialize = isLoggedIn(league) &&
      league.season.data === null &&
      league.season.gettingSeason === false &&
      league.season.seasonNotFound === false;
    if (shouldInitialize) {
      getPlayers(league.token.token);
      leagueStore.dispatch({type: GETTING_SEASON, flag: true})
      getCurrentSeason(league.token.token);
    }
  }

  checkForUpdate = () => {
    checkDeployedVersion()
  };

  componentDidMount() {
    this.shouldInitialize(this.props.league);
  }

  componentDidUpdate() {
    this.shouldInitialize(this.props.league);
  }

  render() {
    checkDeployedVersion();
    const league = this.props.league;

    // Do not show anything about a game if there is not season.
    const showGame = shouldShowGame(league);

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link to="/home" className={'nav-home'}>{this.homeIcon}</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"/>
            <Nav>
              <NavDropdown title={this.userIcon} id="collasible-nav-dropdown">
                <LinkContainer exact to={"/login"}>
                  <NavLink>
                    <Button variant="link">Log In/Out</Button>
                  </NavLink>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title={this.barsIcon} id="collasible-nav-dropdown">
                <LinkContainer exact to={"/home"}>
                  <NavLink>
                    <Button variant="link">Home</Button>
                  </NavLink>
                </LinkContainer>
                {
                  isLoggedIn(league) &&
                  <LinkContainer exact to={"/season"}>
                    <NavLink>
                      <Button variant="link">Season</Button>
                    </NavLink>
                  </LinkContainer>
                }
                {
                  isLoggedIn(league) && showGame &&
                  <LinkContainer exact to={"/current-game"}>
                    <NavLink>
                      <Button variant="link">Game</Button>
                    </NavLink>
                  </LinkContainer>
                }
                {
                  isLoggedIn(league) && showGame &&
                  <LinkContainer exact to={"/game/new"}>
                    <NavLink>
                      <Button variant="link">New game</Button>
                    </NavLink>
                  </LinkContainer>
                }
                {
                  isLoggedIn(league) &&
                  <LinkContainer exact to={"/league/players"}>
                    <NavLink>
                      <Button variant="link">Players</Button>
                    </NavLink>
                  </LinkContainer>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="main-view">
          <Row className="justify-content-center text-center gp">
            <Col>
              <Error league={league}/>
            </Col>
          </Row>
          <Row className="justify-content-center text-center gp">
            <Col>
              <Switch>
                <Route exact path='/'>
                  <Home league={league}/>
                </Route>
                <Route path='/home'>
                  <Home league={league}/>
                </Route>
                <Route exact path='/login'>
                  <Login league={league}/>
                </Route>
                <Route exact path='/login/forgot'>
                  <ForgotPassword league={league}/>
                </Route>
                <Route exact path='/login/code'>
                  <ForgotPasswordCode league={league}/>
                </Route>
                <Route exact path='/season'>
                  <Season league={league}/>
                </Route>
                <Route path='/season/new'>
                  <NewSeason league={league}/>
                </Route>
                <Route path='/game/new'>
                  <NewGame league={league}/>
                </Route>
                <Route path='/current-game'>
                  <CurrentGame league={league}/>
                </Route>
                <Route path='/league/players'>
                  <LeaguePlayers league={league}/>
                </Route>
                <Route path='/new-version'>
                  <NewVersion/>
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
