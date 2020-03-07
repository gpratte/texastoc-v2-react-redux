import {
  LOGGED_IN, LOGGED_OUT
} from '../actions/loginActions'

// Take the league as the parameter
function loginReducer(league, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, league, {token: action.token});
    case LOGGED_OUT:
      return Object.assign({}, league, {token: action.token});
    default:
  }

  return league;
}

export default loginReducer
