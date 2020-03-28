import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
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
    const transport = e.target.elements.transportId.checked;

    addNewGame(mmddyyyy[0], mmddyyyy[1], mmddyyyy[2], hostId, transport);
  }


  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
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
