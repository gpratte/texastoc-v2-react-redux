import API from '../utils/api'
import leagueStore from "./leagueStore";
import {API_ERROR} from "./leagueActions";
import {GOT_LEAGUE_PLAYERS} from './leagueActions'

export function getPlayers(token) {
  API.get('/api/v2/players', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_LEAGUE_PLAYERS, players: result.data})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
    });
}

