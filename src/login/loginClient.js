import API from '../utils/api'
import {LOGGED_IN} from './loginActions'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REDIRECT} from "../league/leagueActions";

export function login(email, password) {
  API.post('/login', {email: email, password: password})
    .then(result => {
      leagueStore.dispatch({type: LOGGED_IN, token: result.data.token})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: API_ERROR, message: error.toString()})
    });
}

export function forgot(email) {
  API.post('/password/reset', {email: email}, {
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

