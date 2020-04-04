import API from '../utils/api'
import leagueStore from "./leagueStore";
import {API_ERROR, GOT_LEAGUE_PLAYERS, RESET, REFRESH} from "./leagueActions";
import {getCurrentSeason} from "../season/seasonClient";
import {GETTING_SEASON} from "../season/seasonActions";

export function refreshing(delayMillis) {
  leagueStore.dispatch({type: REFRESH, refresh: true})
  if (delayMillis) {
    setTimeout(function(){ leagueStore.dispatch({type: REFRESH, refresh: false}) }, delayMillis);
  }
}

export function isRefreshing(league) {
  return !!league.refresh;
}

export function refreshLeague() {
  const league = leagueStore.getState();
  leagueStore.dispatch({type: RESET})
  leagueStore.dispatch({type: REFRESH, refresh: true})
  leagueStore.dispatch({type: GETTING_SEASON, flag: true})
  getPlayers(league.token.token);
  getCurrentSeason(league.token.token);
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

export function updatePlayer(playerId, firstName, lastName, phone, email) {
  const updatePlayerRequest = {
    id: parseInt('' + playerId),
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email
  };

  const token = leagueStore.getState().token.token;

  API.put('/api/v2/players/' + playerId, updatePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getPlayers(token);
    })
    .catch(function (error) {
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
