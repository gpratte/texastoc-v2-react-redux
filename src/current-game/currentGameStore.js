import {createStore} from 'redux'
import reducer from './reducers/currentGameReducer'

const game = {
  id: 12345,
  date: 1574003637471,
  hostName: "Bob's your uncle",
  transportRequired: false,
  buyInCost: 40,
  rebuyAddOnCost: 40,
  annualTocCost: 20,
  quarterlyTocCost: 20,
  totalCollected: 1600,
  totalCombinedTocCalculated: 300,
  kittyCalculated: 10,
  prizePotCalculated: 770,
  paidPlayers: 20,
  paidPlayersRemaining: 18,
  averageStack: 85220,
  clockId: 234,
  payouts: [
    {
      id: 56,
      place: 1,
      amount: 200,
      chopAmount: null,
      chopPercent: null,
    }
  ],
  gamePlayers: [],
  players: [
    {
      id: 1,
      firstName: 'Josh',
      lastName: 'Bygosh',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Yoman',
    },
    {
      id: 3,
      firstName: 'Homer',
      lastName: null,
    },
    {
      id: 4,
      firstName: 'Cameron',
      lastName: 'Cantrell',
    },
    {
      id: 5,
      firstName: null,
      lastName: 'Kibby',
    }
  ],
  seating: {
    numTables: 1,
    numSeatsPerTable: [10],
    tableRequests: [
      {playerId: null, tableNum: 1}
    ],
    tables: []
  },
  showAddExistingPlayer: false,
  showAddNewPlayer: false,
  showConfigureSeating: false,
  showConfigureSeatingKey: 1,
  editGamePlayerId: null
}


const store = createStore(reducer, game);

export default store;
