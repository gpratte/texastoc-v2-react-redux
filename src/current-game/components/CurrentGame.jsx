import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link, Redirect} from 'react-router-dom';
import Details from './Details'
import GamePlayers from './GamePlayers'
import GamePlayersRemaining from './GamePlayersRemaining'
import Seating from './Seating'
import leagueStore from "../../league/leagueStore";
import {GETTING_CURRENT_GAME} from "../actions/gameActions";
import {getPlayers} from "../../league/leagueClient";
import {getCurrentGame} from "../apis/gameClient";

class CurrentGame extends React.Component {
  shouldInitialize = (league) => {
    const shouldInitialize = league.token !== null &&
      league.token.token !== null &&
      league.game.data === null &&
      league.game.gettingCurrentGame === false &&
      league.game.currentGameNotFound === false;
    if (shouldInitialize) {
      leagueStore.dispatch({type: GETTING_CURRENT_GAME, flag: true})
      // Need the season for the season players
      getPlayers(league.token.token);
      getCurrentGame(league.token.token);
    }
  }

  componentDidMount() {
    console.log('current game did mount')
    this.shouldInitialize(this.props.league);
  }

  componentDidUpdate() {
    console.log('current game did update')
    this.shouldInitialize(this.props.league);
  }

  render() {
    if (this.props.league.token === null || this.props.league.token.token === null ) {
      // Must be logged in to view this component
      return (
        <Redirect to='/login'/>
      )
    }

    if (this.props.league.game.currentGameNotFound === true) {
      return (
        <div>
          <br/>
          <p>Current game does not exist.</p>
          <p><Link to="/game/new">
            <Button variant="outline-secondary"> Start a new game </Button> </Link>
          </p>
          <p className={'main-p'}><Link to="/home">
            <Button variant="outline-secondary"> Home </Button> </Link>
          </p>
          <br/>
        </div>
      );
    }

    if (this.props.league.game.data == null) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    const game = this.props.league.game.data;
    return (
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Details
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><Details value={game}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <GamePlayersRemaining value={game}/>
        <GamePlayers value={game}/>

        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Seating
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body><Seating value={game}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      </div>
    );
  }
}

export default CurrentGame
