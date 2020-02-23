import currentGameReducer from '../current-game/reducers/currentGameReducer'
import seasonReducer from '../season/reducers/seasonReducer'
import loginReducer from '../login/reducers/loginReducer'

function leagueReducer(league, action) {
  return {
    token: loginReducer(league.token, action),
    game: currentGameReducer(league.game, action),
    season: seasonReducer(league.season, action)
  }
}

export default leagueReducer
