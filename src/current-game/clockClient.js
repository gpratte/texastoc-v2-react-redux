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
