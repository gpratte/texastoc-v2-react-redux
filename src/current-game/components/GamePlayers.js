import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME,
  TOGGLE_ADD_NEW_PLAYER_TO_GAME,
  EDIT_GAME_PLAYER
} from '../actions/gameActions'
import AddExistingPlayer from "./AddExistingPlayer";
import AddNewPlayer from "./AddNewPlayer";
import EditGamePlayer from "./EditGamePlayer";

class GamePlayers extends React.Component {

  renderGamePlayers(gamePlayers) {
    return gamePlayers.map((gamePlayer, index) => {
      const {
        id, firstName, lastName, buyInCollected, rebuyAddOnCollected, annualTocCollected,
        quarterlyTocCollected, chop, points, finish, knockedOut
      } = gamePlayer;
      return (
        <tr key={id}>
          <td className="knocked-out">{knockedOut ? 'x' : ''}</td>
          <td>{finish}</td>
          <td>
            <Button variant="link" onClick={() => {
              leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: id});
            }}>
              {firstName}{(firstName && lastName) ? ' ' : ''}{lastName}
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
    const game = this.props.value;
    const {gamePlayers} = game;

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

        <AddExistingPlayer value={game}/>
        <AddNewPlayer value={game}/>
        <EditGamePlayer value={game}/>

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
