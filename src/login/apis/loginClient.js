import API from '../../api'
import {LOGGED_IN} from '../actions/loginActions'
import loginStore from "../loginStore";

function login(email, password) {
  API.post('/login',
    {email: email, password: password})
    .then(result => {
      loginStore.dispatch({type: LOGGED_IN, token: result.data.token})
    })
    .catch(function (error) {
      // TODO
      console.log(error);
    });
}

export {login}