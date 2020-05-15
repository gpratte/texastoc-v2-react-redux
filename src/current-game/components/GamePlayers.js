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
import {gameOver} from "../gameUtils";

class GamePlayers extends React.Component {

  isThereChop(gamePlayers) {
    if (!gamePlayers) return false;

    for (let i = 0; i < gamePlayers.length; i++) {
      if (gamePlayers[i].chop) {
        return true;
      }
    }
    return false;
  }

  toggleKnockedOut(id) {
    toggleKnockedOut(id);
  }

  renderAddPlayerButtons(isGameOver) {
    if (isGameOver) {
      return null;
    }
    return (
      <div>
        <Button variant="primary"
                onClick={() => leagueStore.dispatch({type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, show: true})}>
          Add Player
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="primary"
                onClick={() => leagueStore.dispatch({type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, show: true})}>
          Add New Player
        </Button>
      </div>
    )
  }

  renderGamePlayers(gamePlayers, isChop, isGameOver) {
    if (!gamePlayers) {
      return;
    }
    return gamePlayers.map((gamePlayer, index) => {
      const {
        id, name, buyInCollected, rebuyAddOnCollected, annualTocCollected,
        quarterlyTocCollected, chop, points, place, knockedOut, roundUpdates
      } = gamePlayer;
      return (
        <tr key={id}>
          {
            !isGameOver && <td className={'knockedout-toggle'}><Button variant="link" className={'knockedout-toggle'} onClick={() => {this.toggleKnockedOut(id);}}>
              {knockedOut ? <i className="fas fa-user-slash knocked-out"/> : <i className="fas fa-user"/>}
            </Button></td>
          }
          <td>{place ? (place < 11 ? place : '') : ''}</td>
          <td>
            <Button variant="link" onClick={() => {
              leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: id});
            }}>
              {roundUpdates ? <i className="far fa-bell"/> : ''}
              {roundUpdates ? ' ' : ''}
              {name}
            </Button>
          </td>
          <td>{buyInCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{rebuyAddOnCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{annualTocCollected ? String.fromCharCode(10004) : ''}</td>
          <td>{quarterlyTocCollected ? String.fromCharCode(10004) : ''}</td>
          {
            isChop && <td>{chop ? chop : ''}</td>
          }
          <td>{points ? points : ''}</td>
        </tr>
      )
    })
  }

  render() {
    const game = this.props.game;
    if (!game) {
      return null;
    }

    const gamePlayers = game.data.players;
    const players = this.props.players;
    const isGameOver = gameOver(gamePlayers);
    const isChop = this.isThereChop(gamePlayers);
    const numPaidPlayers = game.data.numPaidPlayers;

    return (
      <div>
        <p>Paid Players: {numPaidPlayers}</p>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            {
              !isGameOver && <th></th>
            }
            <th><i className="fas fa-clipboard-list"/></th>
            <th>Name</th>
            <th>B<br/>u<br/>y<br/>I<br/>n</th>
            <th>R<br/>e<br/>B<br/>u<br/>y</th>
            <th>T<br/>O<br/>C</th>
            <th>Q<br/>T<br/>O<br/>C</th>
            {
              isChop && <th>Chop</th>
            }
            <th>Pts</th>

          </tr>
          </thead>
          <tbody>
          {this.renderGamePlayers(gamePlayers, isChop, isGameOver)}
          </tbody>
        </Table>

        <AddExistingPlayer game={game} players={players}/>
        <AddNewPlayer game={game}/>
        <EditGamePlayer game={game}/>

        {this.renderAddPlayerButtons(isGameOver)}
      </div>
    );
  }
}

export default GamePlayers
