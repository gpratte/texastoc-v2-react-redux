import {
  LOGGED_IN
} from '../actions/loginActions'

// Take the league as the parameter
function loginReducer(league, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, league, {token: action.token});
    default:
  }

  return league;
}

export default loginReducer
