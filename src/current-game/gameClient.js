import API from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REDIRECT, REFRESH} from "../league/leagueActions";
import {
  ADDED_NEW_GAME,
  GOT_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND,
  SEATING_NOTIFIED
} from './gameActions'
import {getCurrentSeason} from "../season/seasonClient";

export function addNewGame(month, day, year, hostId) {
  let createGameRequest = {};
  createGameRequest.hostId = parseInt('' + hostId);
  createGameRequest.date = year + '-' + month + '-' + day;
  createGameRequest.transportRequired = false;
  createGameRequest.doubleBuyIn = false;

  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games', createGameRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: ADDED_NEW_GAME, game: result.data})
      leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to start a new game";
      } if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot start a new game while there is a game in progress";
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
  API.get('/api/v2/games', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.current+json'
    },
    data: {}
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_CURRENT_GAME, game: result.data})
      leagueStore.dispatch({type: REFRESH, refresh: false})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: REFRESH, refresh: false})
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

  API.post('/api/v2/games/' + gameId + '/players', createGamePlayerRequest, {
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

  API.post('/api/v2/games/' + gameId + '/players', firstTimeGamePlayer, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.new-player+json'
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

export function updatePlayer(gamePlayerId, buyIn, toc, qtoc, rebuy, place, knockedOut, clockAlert, chop) {
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
    roundUpdates: clockAlert,
    chop: chop
  };

  const token = leagueStore.getState().token.token;

  API.put('/api/v2/games/' + gameId + '/players/' + gamePlayerId, updateGamePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot change the game in any way after it has ended";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function deletePlayer(gamePlayerId) {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.delete('/api/v2/games/' + gameId + '/players/' + gamePlayerId, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot change the game in any way after it has ended";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function toggleKnockedOut(gamePlayerId) {
  const token = leagueStore.getState().token.token;
  const gameId = leagueStore.getState().game.data.id;

  API.put('/api/v2/games/' + gameId + '/players/' + gamePlayerId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.knockout+json'
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

export function seating(numSeatsPerTable, tableRequests) {
  const gameId = leagueStore.getState().game.data.id;
  let seatingRequest = {};
  seatingRequest.gameId = parseInt('' + gameId);
  seatingRequest.numSeatsPerTable = numSeatsPerTable;
  seatingRequest.tableRequests = tableRequests;

  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/' + gameId + '/seats', seatingRequest, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.assign-seats+json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: SEATING_NOTIFIED, flag: false})
      getCurrentGame(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function notifySeating() {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/' + gameId + '/seats', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.notify-seats+json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: SEATING_NOTIFIED, flag: true})
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function finalize(gameId) {
  const token = leagueStore.getState().token.token;

  API.put('/api/v2/games/' + gameId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.finalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
      getCurrentSeason(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function unfinalize(gameId) {
  const token = leagueStore.getState().token.token;

  API.put('/api/v2/games/' + gameId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.unfinalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to edit the game";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
