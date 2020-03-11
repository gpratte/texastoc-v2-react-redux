import currentGameReducer from '../current-game/reducers/currentGameReducer'
import seasonReducer from '../season/reducers/seasonReducer'
import loginReducer from '../login/reducers/loginReducer'
import {API_ERROR} from "./leagueActions";

function leagueReducer(league, action) {
  switch (action.type) {
    case API_ERROR:
      return Object.assign({}, league, {apiError: action.message});
    default:
      return {
        apiError: null,
        token: loginReducer(league.token, action),
        game: currentGameReducer(league.game, action),
        season: seasonReducer(league.season, action)
      }
  }
}

export default leagueReducer
