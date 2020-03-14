import API from '../../utils/api'
import leagueStore from "../../league/leagueStore";
import {API_ERROR} from "../../league/leagueActions";
import {ADDED_NEW_GAME,
  GOT_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND,
  UPDATED_GAME} from '../actions/gameActions'

export function addNewGame(month, day, year, hostId, transport) {
  let createGameRequest = {};
  createGameRequest.hostId = parseInt('' + hostId);
  createGameRequest.date = year + '-' + month + '-' + day;
  createGameRequest.transportRequired = transport;
  createGameRequest.doubleBuyIn = false;

  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games', createGameRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: ADDED_NEW_GAME, game: result.data})
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to start a new game";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function getCurrentGame(token) {
  API.get('/api/v2/games/current', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_CURRENT_GAME, game: result.data})
    })
    .catch(function (error) {
      if (error.response && error.response.status && error.response.status === 404) {
        leagueStore.dispatch({type: CURRENT_GAME_NOT_FOUND, flag: true})
      } else {
        leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
      }
    });
}

export function addExistingPlayer(playerId, buyIn, toc, qtoc) {
  const gameId = leagueStore.getState().game.data.id;

  let createGamePlayerRequest = {};
  createGamePlayerRequest.gameId = parseInt('' + gameId);
  createGamePlayerRequest.playerId = parseInt('' + playerId);
  createGamePlayerRequest.buyInCollected = buyIn;
  createGamePlayerRequest.annualTocCollected = toc;
  createGamePlayerRequest.quarterlyTocCollected = qtoc;

  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/players', createGamePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: UPDATED_GAME, game: result.data})
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

