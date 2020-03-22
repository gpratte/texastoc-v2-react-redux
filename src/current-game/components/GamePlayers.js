import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME,
  TOGGLE_ADD_NEW_PLAYER_TO_GAME,
  EDIT_GAME_PLAYER
} from '../gameActions'
import AddExistingPlayer from "./AddExistingPlayer";
import AddNewPlayer from "./AddNewPlayer";
import EditGamePlayer from "./EditGamePlayer";
import {toggleKnockedOut} from "../gameClient";

class GamePlayers extends React.Component {

  toggleKnockedOut(id) {
    toggleKnockedOut(id);
  }

  renderGamePlayers(gamePlayers) {
    if (!gamePlayers) {
      return;
    }
    return gamePlayers.map((gamePlayer, index) => {
      const {
        id, name, buyInCollected, rebuyAddOnCollected, annualTocCollected,
        quarterlyTocCollected, chop, points, place, knockedOut
      } = gamePlayer;
      return (
        <tr key={id}>
          <td>
            <Button variant="link" onClick={() => {
              this.toggleKnockedOut(id);
            }}>
               {knockedOut ? <i className="fas fa-user-slash knocked-out"></i> : <i className="fas fa-user"></i>}
            </Button>
          </td>

          <td>{place ? (place < 11 ? place : '') : ''}</td>
          <td>
            <Button variant="link" onClick={() => {
              leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: id});
            }}>
              {name}
            </Button>
          </td>
          <td>{buyInCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{rebuyAddOnCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{annualTocCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{quarterlyTocCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{chop ? chop : ''}</td>
          <td>{points ? points : ''}</td>
        </tr>
      )
    })
  }

  render() {
    const game = this.props.game;
    const gamePlayers = game.data.players;
    const players = this.props.players;

    return (
      <div>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            <th></th>
            <th>Fin</th>
            <th>Name</th>
            <th>Buy<br/>In</th>
            <th>Re<br/>Buy</th>
            <th>TOC</th>
            <th>QTOC</th>
            <th>Chop</th>
            <th>Pts</th>

          </tr>
          </thead>
          <tbody>
          {this.renderGamePlayers(gamePlayers)}
          </tbody>
        </Table>

        <AddExistingPlayer game={game} players={players}/>
        <AddNewPlayer game={game}/>
        <EditGamePlayer game={game}/>

        <Button variant="primary" onClick={() => leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: true})}>
          Add Player
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="primary" onClick={() => leagueStore.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: true})}>
          Add New Player
        </Button>
      </div>
    );
  }
}

export default GamePlayers
