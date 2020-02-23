import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  ADD_EXISTING_PLAYER_TO_GAME,
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME
} from '../actions/gameActions'
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
    leagueStore.dispatch({type: ADD_EXISTING_PLAYER_TO_GAME, player: {
        id: e.target.elements.playerId.value,
        buyInCollected: e.target.elements.buyInId.checked,
        annualTocCollected: e.target.elements.tocId.checked,
        quarterlyTocCollected: e.target.elements.qtocId.checked,
      }})
  }

  render() {
    const game = this.props.value;
    const {players, gamePlayers} = game;

    return (
      <div>
        <Modal show={this.props.value.showAddExistingPlayer} onHide={() => leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: false})}>
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
