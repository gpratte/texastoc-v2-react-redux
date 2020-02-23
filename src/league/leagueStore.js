import {createStore} from 'redux'
import leagueReducer from './leagueReducer'

const league = {
  token: null,
  game: {
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
  },
  season: {
    id: 1234,
    start: 1586908800000,
    end: 1618444800000,
    kittyPerGame: 10,
    tocPerGame: 20,
    quarterlyTocPerGame: 40,
    quarterlyNumPayouts: 3,
    buyInCost: 40,
    rebuyAddOnCost: 40,
    rebuyAddOnTocDebit: 20,

    buyInCollected: 20000,
    rebuyAddOnCollected: 18000,
    annualTocCollected: 10000,
    totalCollected: 48000,
    annualTocFromRebuyAddOnCalculated: 8000,
    rebuyAddOnLessAnnualTocCalculated: 10000,
    totalCombinedAnnualTocCalculated: 12000,
    kittyCalculated: 300,
    prizePotCalculated: 25000,

    numGames: 25,
    numGamesPlayed: 25,
    lastCalculated: 1597449600000,
    finalized: false,

    players: [
      {
        id: 1,
        playerId: 22,
        seasonId: 1234,
        name: 'Josh Bygosh',
        entries: 8,
        points: 456,
        place: 1,
        forfeit: false
      },
      {
        id: 2,
        playerId: 23,
        seasonId: 1234,
        name: 'Mal Reynolds',
        entries: 7,
        points: 401,
        place: 2,
        forfeit: false
      },
      {
        id: 3,
        playerId: 24,
        seasonId: 1234,
        name: 'Zoe Washburne',
        entries: 7,
        points: 223,
        place: 3,
        forfeit: false
      }
    ],

    payouts: [
      {
        id: 1,
        seasonId: 1234,
        place: 1,
        amount: 1550
      },
      {
        id: 2,
        seasonId: 1234,
        place: 2,
        amount: 1345
      }
    ],

    quarterlySeasons: [
      {
        id: 5,
        seasonId: 1234,
        start: 1586908800000,
        end: 1594771200000,
        finalized: false,
        quarter: 1,
        numGames: 10,
        numGamesPlayed: 10,
        qTocCollected: 2000,
        qTocPerGame: 40,
        numPayouts: 3,
        lastCalculated: 1597449600000,
        players: [
          {
            id: 1,
            playerId: 4,
            seasonId: 1234,
            qSeasonId: 5,
            name: 'Inara Serra',
            entries: 6,
            points: 125,
            place: 1
          },
          {
            id: 2,
            playerId: 5,
            seasonId: 1234,
            qSeasonId: 5,
            name: 'Jayne Cobb',
            entries: 4,
            points: 100,
            place: 2
          }
        ],
        payouts: [
          {
            id: 1,
            seasonId: 1234,
            qSeasonId: 5,
            place: 1,
            amount: 1100
          },
          {
            id: 2,
            seasonId: 1234,
            qSeasonId: 5,
            place: 2,
            amount: 675
          },
          {
            id: 3,
            seasonId: 1234,
            qSeasonId: 5,
            place: 3,
            amount: 325
          }
        ]
      }
    ],

    games: [
      {
        id: 1,
        date: 1586995200000,
        hostName: "Bob's your uncle",
        transportRequired: false,
        totalCollected: 1600,
        totalCombinedTocCalculated: 300,
        kittyCalculated: 10,
        prizePotCalculated: 770,
        paidPlayers: 20,
        paidPlayersRemaining: 0,
        averageStack: 85220,
        clockId: 234,
        seasonGame: 7,
        quarterlyGame: 7,
        payouts: [
          {
            id: 56,
            place: 1,
            amount: 200,
            chopAmount: null,
            chopPercent: null,
          },
          {
            id: 57,
            place: 2,
            amount: 150,
            chopAmount: null,
            chopPercent: null,
          }
        ],
        players: [
          {
            id: 24,
            playerId: 15,
            gameId: 3,
            firstName: 'Josh',
            lastName: 'Bygosh',
            name: 'Josh Bygosh',
            points: 42,
            place: 9,
            knockedOut: true,
            buyInCollected: 40,
            rebuyAddOnCollected: null,
            annualTocCollected: 20,
            quarterlyTocCollected: null,
            chop: null
          },
          {
            id: 23,
            playerId: 14,
            gameId: 3,
            firstName: 'John',
            lastName: 'Yoman',
            name: 'John Yoman',
            points: 35,
            place: 10,
            knockedOut: true,
            buyInCollected: 40,
            rebuyAddOnCollected: 40,
            annualTocCollected: 20,
            quarterlyTocCollected: 20,
            chop: null
          },
          {
            id: 22,
            playerId: 13,
            gameId: 3,
            firstName: 'Homer',
            lastName: null,
            name: 'Homer',
            points: null,
            finish: null,
            knockedOut: null,
            buyInCollected: 40,
            rebuyAddOnCollected: null,
            annualTocCollected: null,
            quarterlyTocCollected: null,
            chop: null
          },
          {
            id: 25,
            playerId: 55,
            gameId: 3,
            firstName: 'Cameron',
            lastName: 'Cantrell',
            name: 'Cameron Cantrell',
            points: null,
            finish: null,
            knockedOut: null,
            buyInCollected: 40,
            rebuyAddOnCollected: 40,
            annualTocCollected: 20,
            quarterlyTocCollected: null,
            chop: null
          },
          {
            id: 27,
            playerId: 17,
            gameId: 3,
            firstName: null,
            lastName: 'Kibby',
            name: 'Kibby',
            points: null,
            finish: null,
            knockedOut: true,
            buyInCollected: 40,
            rebuyAddOnCollected: 40,
            annualTocCollected: null,
            quarterlyTocCollected: null,
            chop: null
          }
        ]
      },
      {
        id: 2,
        date: 1587600000000,
        hostName: "Mark Bark",
        transportRequired: false,
        totalCollected: 1500,
        totalCombinedTocCalculated: 280,
        kittyCalculated: 10,
        prizePotCalculated: 750,
        paidPlayers: 20,
        paidPlayersRemaining: 0,
        averageStack: 2500000,
        clockId: 234,
        payouts: [
          {
            id: 56,
            place: 1,
            amount: 180,
            chopAmount: null,
            chopPercent: null,
          },
          {
            id: 57,
            place: 2,
            amount: 130,
            chopAmount: null,
            chopPercent: null,
          }
        ],
        players: [
          {
            id: 24,
            playerId: 15,
            gameId: 3,
            firstName: 'Josh',
            lastName: 'Bygosh',
            points: 0,
            finish: null,
            knockedOut: true,
            buyInCollected: 40,
            rebuyAddOnCollected: null,
            annualTocCollected: 20,
            quarterlyTocCollected: null,
            chop: null
          },
          {
            id: 23,
            playerId: 14,
            gameId: 3,
            firstName: 'John',
            lastName: 'Yoman',
            points: 55,
            finish: 1,
            knockedOut: true,
            buyInCollected: 40,
            rebuyAddOnCollected: 40,
            annualTocCollected: 20,
            quarterlyTocCollected: 20,
            chop: null
          },
          {
            id: 22,
            playerId: 13,
            gameId: 3,
            firstName: 'Homer',
            lastName: null,
            points: null,
            finish: null,
            knockedOut: null,
            buyInCollected: 40,
            rebuyAddOnCollected: null,
            annualTocCollected: null,
            quarterlyTocCollected: null,
            chop: null
          },
          {
            id: 25,
            playerId: 55,
            gameId: 3,
            firstName: 'Cameron',
            lastName: 'Cantrell',
            points: null,
            finish: null,
            knockedOut: null,
            buyInCollected: 40,
            rebuyAddOnCollected: 40,
            annualTocCollected: 20,
            quarterlyTocCollected: null,
            chop: null
          },
          {
            id: 27,
            playerId: 17,
            gameId: 3,
            firstName: null,
            lastName: 'Kibby',
            points: 36,
            finish: 2,
            knockedOut: true,
            buyInCollected: 40,
            rebuyAddOnCollected: 40,
            annualTocCollected: null,
            quarterlyTocCollected: null,
            chop: null
          }
        ]
      }
    ]
  }
}

const store = createStore(leagueReducer, league);

export default store;
