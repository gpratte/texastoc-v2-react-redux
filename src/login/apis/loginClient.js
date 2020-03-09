import API from '../../utils/api'
import {LOGGED_IN} from '../actions/loginActions'
import leagueStore from "../../league/leagueStore";
import {API_ERROR} from "../../league/leagueActions";

function login(email, password) {
  API.post('/login',
    {email: email, password: password})
    .then(result => {
      leagueStore.dispatch({type: LOGGED_IN, token: result.data.token})
    })
    .catch(function (error) {
      leagueStore.dispatch({type: API_ERROR, message: error.toString()})
    });
}

export {login}
