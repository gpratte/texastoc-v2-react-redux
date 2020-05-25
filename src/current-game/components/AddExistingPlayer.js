import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME
} from '../gameActions'
import {addExistingPlayer} from "../gameClient";
import _ from 'lodash';

class AddExistingPlayer extends React.Component {

  renderPlayers(players, seasonPlayers, gamePlayers) {
    // Remove players already in game
    const playersFiltered = _.filter(players,
      (p) => {
        let index = _.findIndex(gamePlayers, function(gp) {
          return gp.playerId === p.id;
        });
        // return true if not found (i.e. the player is not
        // filtered out of the players to choose from
        return index === -1;
      }
    );

    let seasonPlayersFiltered;
    if (seasonPlayers) {
      // Remove season players already in game
      seasonPlayersFiltered = _.filter(seasonPlayers,
        (sp) => {
          let index = _.findIndex(gamePlayers, function(gp) {
            return gp.playerId === sp.playerId;
          });
          // return true if not found (i.e. the player is not
          // filtered out of the players to choose from
          return index === -1;
        }
      );
    } else {
      seasonPlayersFiltered = [];
    }

    // Remove players in that are in the season
    const playersFiltered2 = _.filter(playersFiltered,
      (p) => {
        let index = _.findIndex(seasonPlayersFiltered, function(sp) {
          return sp.playerId === p.id;
        });
        // return true if not found (i.e. the player is not
        // filtered out of the players to choose from
        return index === -1;
      }
    );

    // Separator
    seasonPlayersFiltered.push({id: 0, name: '----------------------'})

    // Combine season players followed by players
    seasonPlayersFiltered.push(...playersFiltered2);

    return seasonPlayersFiltered.map((player, index) => {
      const {
        id, playerId, firstName, lastName, name
      } = player;

      let text;
      if (!name) {
        text = firstName ? firstName : '';
        text += (firstName && lastName) ? ' ' : '';
        text += lastName ? lastName : '';
      } else {
        text = name;
      }

      let ident = playerId ? playerId : id;

      return (
        <option key={ident} value={ident}>{text}</option>
      )
    })
  }

  addExistingPlayer = (e) => {
    e.preventDefault();
    if (e.target.elements.playerId.value === '0') {
      return;
    }
    leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: false})
    addExistingPlayer(e.target.elements.playerId.value,
      e.target.elements.buyInId.checked,
      e.target.elements.tocId.checked,
      e.target.elements.qtocId.checked);
  }

  render() {
    const game = this.props.game;
    const players = this.props.players;
    const gamePlayers = game.data.players;
    const seasonPlayers = this.props.seasonPlayers;

    // Sort season players by name
    seasonPlayers.sort((sp1, sp2) => sp1.name.localeCompare(sp2.name));

    return (
      <div>
        <Modal show={game.showAddExistingPlayer}
               backdrop={'static'}
               onHide={() => leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.addExistingPlayer}>
              <Form.Group>
                <Form.Control as="select" id="playerId">
                  {this.renderPlayers(players, seasonPlayers, gamePlayers)}
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
