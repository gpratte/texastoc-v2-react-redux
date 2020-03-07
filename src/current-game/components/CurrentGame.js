import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import Details from './Details'
import GamePlayers from './GamePlayers'
import GamePlayersRemaining from './GamePlayersRemaining'
import Seating from './Seating'

class CurrentGame extends React.Component {
  render() {
    if (this.props.league.token === null || this.props.league.token.token === null ) {
      // Must be logged in to view this component
      return (
        <Redirect to='/login'/>
      )
    }

    const game = this.props.league.game;
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
