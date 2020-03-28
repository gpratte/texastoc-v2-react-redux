import API from '../utils/api'
import leagueStore from "./leagueStore";
import {API_ERROR, GOT_LEAGUE_PLAYERS, RESET, REFRESH} from "./leagueActions";
import {getCurrentSeason} from "../season/seasonClient";

export function refresh() {
  leagueStore.dispatch({type: RESET})
  leagueStore.dispatch({type: REFRESH, refresh: true})
  getCurrentSeason();
  setTimeout(function(){ leagueStore.dispatch({type: REFRESH, refresh: false}) }, 3000);
}

export function isRefreshing(league) {
  return !!league.refresh;
}

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

