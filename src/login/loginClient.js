import {server} from '../utils/api'
import {LOGGED_IN} from './loginActions'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REDIRECT} from "../league/leagueActions";

export function login(email, password) {
  server.post('/login', {email: email, password: password})
    .then(result => {
      leagueStore.dispatch({type: LOGGED_IN, token: result.data.token})
      leagueStore.dispatch({type: REDIRECT, to: '/home'})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: API_ERROR, message: error.toString()})
    });
}

export function forgot(email) {
  server.post('/password/reset', {email: email}, {
    headers: {
      'Content-Type': 'application/vnd.texastoc.password-forgot+json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: REDIRECT, to: '/login/code'})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: API_ERROR, message: error.toString()})
    });
}

export function resetPassword(code, password) {
  server.post('/password/reset', {code, password}, {
    headers: {
      'Content-Type': 'application/vnd.texastoc.password-reset+json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: REDIRECT, to: '/login'})
    })
    .catch(function (error) {
      let message;
      if (error.response && error.response.status && error.response.status === 404) {
        message = "Code not found";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
