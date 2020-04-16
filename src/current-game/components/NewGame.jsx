import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addNewGame} from '../gameClient'
import {shouldRedirect, redirect} from '../../utils/util';

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

    addNewGame(mmddyyyy[0], mmddyyyy[1], mmddyyyy[2], hostId);
  }


  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    const {players} = this.props.league;

    return (
      <div>
        <br/>
        <h1>New Game</h1>
        <br/>
        <Form onSubmit={this.addNewGame}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" placeholder="mm/dd/yyyy" id={'dateId'}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Host</Form.Label>
            <Form.Control as="select" id="hostId">
              {this.renderPlayers(players)}
            </Form.Control>
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">New Game</Button>
        </Form>
      </div>
    );
  }
}

export default NewGame
