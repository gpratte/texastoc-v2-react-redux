import currentGameReducer from '../current-game/currentGameReducer'
import seasonReducer from '../season/seasonReducer'
import loginReducer from '../login/loginReducer'
import {API_ERROR, GOT_LEAGUE_PLAYERS} from "./leagueActions";

function leagueReducer(league, action) {
  switch (action.type) {
    case API_ERROR:
      return Object.assign({}, league, {apiError: action.message});
    case GOT_LEAGUE_PLAYERS:
      return Object.assign({}, league, {players: action.players});
    default:
      return Object.assign({}, league,
        {apiError: null},
        {token: loginReducer(league.token, action)},
        {game: currentGameReducer(league.game, action)},
        {season: seasonReducer(league.season, action)});
  }
}

export default leagueReducer
