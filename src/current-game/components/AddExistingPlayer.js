import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME
} from '../actions/gameActions'
import {addExistingPlayer} from "../apis/gameClient";
import _ from 'lodash';

class AddExistingPlayer extends React.Component {

  renderPlayers(players, gamePlayers) {
    // Remove players already in game
    const filtered = _.filter(players,
      (p) => {
        let index = _.findIndex(gamePlayers, {"playerId": p.id});
        return index === -1;
      }
    )

    return filtered.map((player, index) => {
      const {
        id, firstName, lastName
      } = player;
      return (
        <option key={id} value={id}>{firstName}{(firstName && lastName) ? ' ' : ''}{lastName}</option>
      )
    })
  }

  addExistingPlayer = (e) => {
    e.preventDefault();
    addExistingPlayer(e.target.elements.playerId.value,
      e.target.elements.buyInId.checked,
      e.target.elements.tocId.checked,
      e.target.elements.qtocId.checked);
  }

  render() {
    const game = this.props.game;
    const players = this.props.players;
    const {gamePlayers} = game.data;

    return (
      <div>
        <Modal show={game.showAddExistingPlayer} onHide={() => leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.addExistingPlayer}>
              <Form.Group>
                <Form.Control as="select" id="playerId">
                  {this.renderPlayers(players, gamePlayers)}
                </Form.Control>
              </Form.Group>
              <Form.Check inline
                          type={'checkbox'}
                          id={'buyInId'}
                          label={'Buy-In'}
              />
              <Form.Check inline
                          type={'checkbox'}
                          id={'tocId'}
                          label={'Annual TOC'}
              />
              <Form.Check inline
                          type={'checkbox'}
                          id={'qtocId'}
                          label={'Quarterly TOC'}
              />
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: false})
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Player
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddExistingPlayer
