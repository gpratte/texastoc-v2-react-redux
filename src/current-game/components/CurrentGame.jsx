import React from 'react'
import './currentGame.css'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Details from './Details'
import GamePlayers from './GamePlayers'
import Clock2 from './Clock2'
import Seating from './Seating'
import Finalize from './Finalize'
import leagueStore from "../../league/leagueStore";
import {GETTING_CURRENT_GAME} from "../gameActions";
import {getCurrentGame, getCurrentGameIfNotFinalized} from "../gameClient";
import {gameOver} from "../gameUtils";
import {shouldRedirect, redirect} from '../../utils/util';
import {refreshing} from '../../league/leagueClient'

class CurrentGame extends React.Component {
  shouldInitialize = (league) => {
    const shouldInitialize = league.token !== null &&
      league.token.token !== null &&
      league.game.data === null &&
      league.game.gettingCurrentGame === false &&
      league.game.currentGameNotFound === false;
    if (shouldInitialize) {
      leagueStore.dispatch({type: GETTING_CURRENT_GAME, flag: true})
      getCurrentGame(league.token.token);
    }
  }

  componentDidMount() {
    leagueStore.dispatch({type: GETTING_CURRENT_GAME, flag: true})
    getCurrentGame();
    this.timer = setInterval(this.check, 4000);
  }

  componentDidUpdate() {
    this.shouldInitialize(this.props.league);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  check = () => {
    getCurrentGameIfNotFinalized();
  };

  // TODO move to utils
  refreshGame = () => {
    refreshing();
    getCurrentGame();
  }

  render() {
    const league = this.props.league;

    let redirectTo;
    if ((redirectTo = shouldRedirect(league))) {
      return redirect(redirectTo);
    }

    if (league.game.currentGameNotFound === true) {
      return (
        <div>
          <br/>
          <h1>Missing Current Game</h1>
          <br/>
          <p><Link to="/game/new">
            <Button variant="outline-secondary"> Start a new game </Button> </Link>
          </p>
          <br/>
        </div>
      );
    }

    if (league.game.data == null) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    const game = league.game;
    const isGameOver = gameOver(game.data.players);

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
              <Card.Body><Details game={game}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {
          !isGameOver &&
          <Clock2 game={game}/>
        }

        {/* TODO <GamePlayersRemaining game={game}/>*/}
        <GamePlayers game={game} players={this.props.league.players}/>
        <Finalize isGameOver={isGameOver} gameId={game.data.id} finalized={game.data.finalized}/>

        {
          !isGameOver &&
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Seating
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body><Seating game={game}/></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        }
      </div>
    );
  }
}

export default CurrentGame
