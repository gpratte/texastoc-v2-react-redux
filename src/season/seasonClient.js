import API from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR} from "../league/leagueActions";
import {ADDED_NEW_SEASON, GOT_SEASON, SEASON_NOT_FOUND} from './seasonActions'

export function addNewSeason(month, day, year) {
  const dates = [];
  dates.push(parseInt('' + year, 10));
  dates.push(parseInt('' + month, 10));
  dates.push(parseInt('' + day, 10));

  const token = leagueStore.getState().token.token;

  API.post('/api/v2/seasons', dates, {
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
  API.get('/api/v2/seasons/current', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_SEASON, season: result.data})
    })
    .catch(function (error) {
      if (error.response && error.response.status && error.response.status === 404) {
        leagueStore.dispatch({type: SEASON_NOT_FOUND, flag: true})
      } else {
        leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
      }
    });
}

