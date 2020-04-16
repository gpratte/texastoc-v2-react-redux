import React from 'react'
import './currentGame.css'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner";
import {Link} from 'react-router-dom';
import Details from './Details'
import GamePlayers from './GamePlayers'
import Clock from './Clock'
import Seating from './Seating'
import Finalize from './Finalize'
import leagueStore from "../../league/leagueStore";
import {GETTING_CURRENT_GAME} from "../gameActions";
import {getCurrentGame} from "../gameClient";
import {gameOver} from "../gameUtils";
import {shouldRedirect, redirect} from '../../utils/util';
import {refreshing, isRefreshing} from '../../league/leagueClient'

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
    this.shouldInitialize(this.props.league);
  }

  componentDidUpdate() {
    this.shouldInitialize(this.props.league);
  }

  // TODO move to utils
  refreshGame = () => {
    refreshing();
    getCurrentGame();
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    if (this.props.league.game.currentGameNotFound === true) {
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

    if (this.props.league.game.data == null) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    const league = this.props.league;
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
              {
                !isRefreshing(league) &&
                <Button variant="link" className={'refresh'} onClick={() => this.refreshGame()}>
                  <i className="fas fa-sync-alt"/>
                </Button>
              }
              {
                isRefreshing(league) &&
                <Button variant="link" disabled={true}>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </Button>
              }
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><Details game={game}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {
          !isGameOver &&
          <Clock game={game}/>
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
