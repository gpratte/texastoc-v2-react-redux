import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, Redirect} from "react-router-dom";
import {addNewGame} from '../gameClient'

class NewGame extends React.Component {

  renderPlayers(players) {
    return players.map((player, index) => {
      const {
        id, firstName, lastName
      } = player;
      return (
        <option key={id} value={id}>{firstName}{(firstName && lastName) ? ' ' : ''}{lastName}</option>
      )
    })
  }

  addNewGame = (e) => {
    e.preventDefault();
    const date = e.target.elements.dateId.value;
    const mmddyyyy = date.split('/')

    const hostId = e.target.elements.hostId.value;
    const transport = e.target.elements.transportId.checked;

    addNewGame(mmddyyyy[0], mmddyyyy[1], mmddyyyy[2], hostId, transport);
  }


  render() {
    if (this.props.league.token === null || this.props.league.token.token === null ) {
      // Must be logged in to view this component
      return (
        <Redirect to='/login'/>
      )
    }

    if (this.props.league.game.data !== null) {
      return (
        <Redirect to='/current-game'/>
      )
    }

    const {players} = this.props.league;

    return (
      <div>
        <h1>New Game</h1>
        <Form onSubmit={this.addNewGame}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" placeholder="mm/dd/yyyy" id={'dateId'}/>
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" id="hostId">
              {this.renderPlayers(players)}
            </Form.Control>
          </Form.Group>
          <Form.Check inline
                      type={'checkbox'}
                      id={'transportId'}
                      label={'Transport Supplies Required'}
          />
          <br/>
          <Button variant="primary" type="submit">New Game</Button>
          <br/>
          <Link to="/home">
            <Button variant="outline-secondary"> Home </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default NewGame
