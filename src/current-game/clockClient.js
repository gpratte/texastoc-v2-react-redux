import API from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR} from "../league/leagueActions";

export function getClock(callback) {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.get('/api/v2/games/' + gameId + '/clock', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      callback(result.data);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function resume() {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/' + gameId + '/clock', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.clock-resume+json'
    }
  })
    .then(result => {
      // do nothing
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function pause() {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/' + gameId + '/clock', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.clock-pause+json'
    }
  })
    .then(result => {
      // do nothing
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function back() {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/' + gameId + '/clock', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.clock-back+json'
    }
  })
    .then(result => {
      // do nothing
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function forward() {
  const gameId = leagueStore.getState().game.data.id;
  const token = leagueStore.getState().token.token;

  API.post('/api/v2/games/' + gameId + '/clock', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.clock-forward+json'
    }
  })
    .then(result => {
      // do nothing
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
