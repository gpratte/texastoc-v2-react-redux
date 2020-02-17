import {createStore} from 'redux'
import reducer from './reducers/loginReducer'

const token = null

const loginStore = createStore(reducer, token);

export default loginStore;
