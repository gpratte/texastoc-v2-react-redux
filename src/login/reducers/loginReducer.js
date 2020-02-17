import {
  LOGGED_IN
} from '../actions/loginActions'

// Take the token as the parameter
function reducer(token, action) {
  switch (action.type) {
    case LOGGED_IN:
      token = action.token;
      break;
    default:
  }

  return token;
}

export default reducer
