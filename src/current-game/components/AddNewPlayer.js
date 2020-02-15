import React from 'react'
import './GamePlayers.css'
import store from '../currentGameStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  ADD_NEW_PLAYER_TO_GAME,
  TOGGLE_ADD_NEW_PLAYER_TO_GAME
} from '../actions/gameActions'

class AddNewPlayer extends React.Component {

  addNewPlayer = (e) => {
    e.preventDefault();
    store.dispatch({type: ADD_NEW_PLAYER_TO_GAME, player: {
        firstName: e.target.elements.firstNameId.value,
        lastName: e.target.elements.lastNameId.value,
        email: e.target.elements.emailId.value,
        buyInCollected: e.target.elements.buyInId.checked,
        annualTocCollected: e.target.elements.tocId.checked,
        quarterlyTocCollected: e.target.elements.qtocId.checked,
      }})
  }


  render() {
    return (
      <div>
        <Modal show={this.props.value.showAddNewPlayer} onHide={() => store.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.addNewPlayer}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="First"  id={'firstNameId'}/>
                <Form.Control type="text" placeholder="Last"  id={'lastNameId'}/>
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
                  store.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: false})
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
