import {createStore} from 'redux'
import leagueReducer from './leagueReducer'

const league = {
  token: null,
  game: {
    showAddExistingPlayer: false,
    showAddNewPlayer: false,
    showConfigureSeating: false,
    showConfigureSeatingKey: 1,
    editGamePlayerId: null
  },
  season: {
  },
  apiError: null
}

const store = createStore(leagueReducer, league);

export default store;
