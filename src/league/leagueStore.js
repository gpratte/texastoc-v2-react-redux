import {createStore} from 'redux'
import leagueReducer from './leagueReducer'

const league = {
  players: [],
  game: {
    data: null,
    showAddExistingPlayer: false,
    showAddNewPlayer: false,
    showConfigureSeating: false,
    showConfigureSeatingKey: 1,
    editGamePlayerId: null,
    gettingCurrentGame: false,
    currentGameNotFound: false
  },
  season: {
    data: null,
    gettingSeason: false,
    seasonNotFound: false
  },
  token: null,
  apiError: null
}

const store = createStore(leagueReducer, league);

export default store;
