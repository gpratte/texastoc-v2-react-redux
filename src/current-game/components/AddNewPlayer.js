import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  TOGGLE_ADD_NEW_PLAYER_TO_GAME
} from '../gameActions'
import {addNewPlayer} from "../gameClient";

class AddNewPlayer extends React.Component {

  addNewGamePlayer = (e) => {
    e.preventDefault();
    leagueStore.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: false})
    addNewPlayer(e.target.elements.firstNameId.value,
      e.target.elements.lastNameId.value,
      e.target.elements.emailId.value,
      e.target.elements.buyInId.checked,
      e.target.elements.tocId.checked,
      e.target.elements.qtocId.checked);
  }

  render() {
    const game = this.props.game;

    return (
      <div>
        <Modal show={game.showAddNewPlayer}
               onHide={() => leagueStore.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.addNewGamePlayer}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="First" id={'firstNameId'}/>
                <Form.Control type="text" placeholder="Last" id={'lastNameId'}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id={'emailId'}/>
                <Form.Text className="text-muted">
                  Needed to login
                </Form.Text>
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
                  leagueStore.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: false})
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add New Player
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default AddNewPlayer
