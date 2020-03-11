import API from '../../utils/api'
import {ADDED_NEW_SEASON} from '../actions/seasonActions'
import leagueStore from "../../league/leagueStore";
import {API_ERROR} from "../../league/leagueActions";

function addNewSeason(month, day, year) {
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
      leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
    });
}

export {addNewSeason}
