import API from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR} from "../league/leagueActions";
import {
  ADDED_NEW_GAME,
  GOT_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND
} from './gameActions'
import _ from 'lodash';

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
  if (!token) {
    token = leagueStore.getState().token.token;
  }
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
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function addNewPlayer(firstName, lastName, email, buyIn, toc, qtoc) {
  const gameId = leagueStore.getState().game.data.id;
  let firstTimeGamePlayer = {};
  firstTimeGamePlayer.gameId = gameId;
  firstTimeGamePlayer.firstName = firstName ? firstName : null;
  firstTimeGamePlayer.lastName = lastName ? lastName : null;
  firstTimeGamePlayer.email = email ? email : null;
  firstTimeGamePlayer.buyInCollected = buyIn;
  firstTimeGamePlayer.annualTocCollected = toc;
  firstTimeGamePlayer.quarterlyTocCollected = qtoc;

  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/players/first', firstTimeGamePlayer, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function updatePlayer(gamePlayerId, buyIn, toc, qtoc, rebuy, place, knockedOut, chop) {
  const gameId = leagueStore.getState().game.data.id;
  const updateGamePlayerRequest = {
    gamePlayerId: parseInt('' + gamePlayerId),
    gameId: gameId,
    buyInCollected: buyIn,
    annualTocCollected: toc,
    quarterlyTocCollected: qtoc,
    rebuyAddOnCollected: rebuy,
    place: place,
    knockedOut: knockedOut,
    chop: chop
  };

  const token = leagueStore.getState().token.token;

  API.put('/api/v2/games/players/' + gamePlayerId, updateGamePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function deletePlayer(gamePlayerId) {
  const token = leagueStore.getState().token.token;

  API.delete('/api/v2/games/players/' + gamePlayerId, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function toggleKnockedOut(gamePlayerId) {
  // find the player
  const gamePlayers = leagueStore.getState().game.data.players;
  const gamePlayer = _.filter(gamePlayers, ['id', gamePlayerId])[0];
  updatePlayer(gamePlayer.id,
    gamePlayer.buyInCollected ? true : false,
    gamePlayer.annualTocCollected ? true : false,
    gamePlayer.quarterlyTocCollected ? true : false,
    gamePlayer.rebuyAddOnCollected ? true : false,
    gamePlayer.place ? gamePlayer.place : null,
    gamePlayer.knockedOut ? false : true,
    gamePlayer.chop ? gamePlayer.chop : null);
}

export function finalize(gameId) {
  const token = leagueStore.getState().token.token;

  API.put('/api/v2/games/' + gameId + '/finalize', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function unfinalize(gameId) {
  const token = leagueStore.getState().token.token;

  API.put('/api/v2/games/' + gameId + '/unfinalize', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
