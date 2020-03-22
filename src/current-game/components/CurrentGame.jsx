import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link, Redirect} from 'react-router-dom';
import Details from './Details'
import GamePlayers from './GamePlayers'
import GamePlayersRemaining from './GamePlayersRemaining'
import Seating from './Seating'
import Finalize from './Finalize'
import leagueStore from "../../league/leagueStore";
import {GETTING_CURRENT_GAME} from "../gameActions";
import {getPlayers} from "../../league/leagueClient";
import {getCurrentGame} from "../gameClient";
import {gameOver} from "../gameUtils";

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
    this.shouldInitialize(this.props.league);
  }

  componentDidUpdate() {
    this.shouldInitialize(this.props.league);
  }

  // TODO move to utils
  refresh = () => {
    getCurrentGame();
  }

  renderSeating(isGameOver, game) {
    if (isGameOver) {
      return null;
    }

    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Seating
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body><Seating game={game}/></Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
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

    const game = this.props.league.game;
    const isGameOver = gameOver(game.data.players);

    return (
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Details
              </Accordion.Toggle>
              <Button variant="outline-secondary" onClick={() => this.refresh()}>Refresh</Button>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><Details game={game}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <GamePlayersRemaining game={game}/>
        <GamePlayers game={game} players={this.props.league.players}/>
        <Finalize isGameOver={isGameOver} gameId={game.data.id} finalized={game.data.finalized}/>

        {this.renderSeating(isGameOver, game)}
      </div>
    );
  }
}

export default CurrentGame
