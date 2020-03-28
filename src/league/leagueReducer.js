import currentGameReducer from '../current-game/currentGameReducer'
import seasonReducer from '../season/seasonReducer'
import loginReducer from '../login/loginReducer'
import {seed} from "../league/leagueStore";
import {API_ERROR,
  GOT_LEAGUE_PLAYERS,
  REDIRECT,
  RESET,
  REFRESH} from "./leagueActions";

function leagueReducer(league, action) {
  switch (action.type) {
    case API_ERROR:
      return Object.assign({}, league, {apiError: action.message});
    case GOT_LEAGUE_PLAYERS:
      return Object.assign({}, league, {players: action.players});
    case REDIRECT:
      return Object.assign({}, league, {redirectTo: action.to});
    case RESET:
      return Object.assign({}, seed, {token: league.token});
    case REFRESH:
      return Object.assign({}, league, {refresh: action.refresh});
    default:
      return Object.assign({}, league,
        {apiError: null},
        {token: loginReducer(league.token, action)},
        {game: currentGameReducer(league.game, action)},
        {season: seasonReducer(league.season, action)});
  }
}

export default leagueReducer
