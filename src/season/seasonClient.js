import {server} from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REDIRECT, REFRESH} from "../league/leagueActions";
import {ADDED_NEW_SEASON, GOT_SEASON, SEASON_NOT_FOUND} from './seasonActions'
import {getCurrentGame} from "../current-game/gameClient";

export function addNewSeason(year) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  const seasonStart = {};
  seasonStart['startYear'] = year;

  server.post('/api/v2/seasons', seasonStart, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: ADDED_NEW_SEASON, season: result.data})
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to create a season";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function getCurrentSeason() {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  server.get('/api/v2/seasons/current', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_SEASON, season: result.data})
      leagueStore.dispatch({type: REFRESH, refresh: false})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: REFRESH, refresh: false})
      if (error.response && error.response.status && error.response.status === 404) {
        leagueStore.dispatch({type: SEASON_NOT_FOUND, flag: true})
      } else {
        leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
      }
    });
}

export function unfinalize(gameId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  server.put('/api/v2/games/' + gameId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.unfinalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
      getCurrentSeason(token);
      leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 409) {
        message = "You cannot unlock a game when another game is unlocked";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function goToGame(gameId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  getCurrentGame(token);
  leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
}
