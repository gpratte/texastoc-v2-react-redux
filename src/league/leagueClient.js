import {server} from '../utils/api'
import leagueStore from "./leagueStore";
import {API_ERROR,
  GOT_LEAGUE_PLAYERS,
  RESET,
  REFRESH,
  VERSION_CHECK,
  NEW_VERSION} from "./leagueActions";
import {getCurrentSeason} from "../season/seasonClient";
import {GETTING_SEASON} from "../season/seasonActions";
import {clearCacheCurrentGame} from "../current-game/gameClient";

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
  clearCacheCurrentGame();
}

export function getPlayers() {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  server.get('/api/v2/players', {
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

export function updatePlayer(playerId, firstName, lastName, phone, email, password) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  const updatePlayerRequest = {
    id: parseInt('' + playerId),
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    password: password
  };

  server.put('/api/v2/players/' + playerId, updatePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getPlayers(token);
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to update the player";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

const DELAY_VERSION_CHECK_MILLIS = 3600000;

export function checkDeployedVersion() {
  if (leagueStore.getState().newVersion) {
    // Have already flagged that a new version is available
    return;
  }
  const internalVersion = leagueStore.getState().version;

  let checkVersion = false;
  let versionCheck = leagueStore.getState().versionCheck;
  if (!versionCheck) {
    checkVersion = true;
  } else {
    if ((new Date()) - versionCheck > DELAY_VERSION_CHECK_MILLIS) {
       checkVersion = true;
    }
  }

  if (checkVersion) {
    leagueStore.dispatch({type: VERSION_CHECK})
    server.get('/api/v2/versions')
      .then(result => {
        const externalVersion = '' + result.data.ui;
        if (internalVersion !== externalVersion) {
          leagueStore.dispatch({type: NEW_VERSION})
        }
      })
      .catch(function (error) {
        // do nothing
      });
  }
}

