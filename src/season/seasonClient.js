import API from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REFRESH} from "../league/leagueActions";
import {ADDED_NEW_SEASON, GOT_SEASON, SEASON_NOT_FOUND} from './seasonActions'

export function addNewSeason(year) {
  const token = leagueStore.getState().token.token;
  const seasonStart = {};
  seasonStart['startYear'] = year;

  API.post('/api/v2/seasons', seasonStart, {
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

export function getCurrentSeason(token) {
  if (!token) {
    token = leagueStore.getState().token.token;
  }
  API.get('/api/v2/seasons/current', {
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

