import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME,
  TOGGLE_ADD_NEW_PLAYER_TO_GAME,
  TOGGLE_CONFIGURE_SEATING,
  EDIT_GAME_PLAYER,
  SUBMIT_SEATING,
  GETTING_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND,
  ADDED_NEW_GAME,
  UPDATED_GAME,
  GOT_CURRENT_GAME
} from '../actions/gameActions'
import _ from 'lodash';

// TODO need a place for utility functions
function getPlayerFullName(player) {
  let fullName = '';
  if (player.firstName) {
    fullName = player.firstName;
  }
  if (player.firstName && player.lastName) {
    fullName += ' ';
  }
  if (player.lastName) {
    fullName += player.lastName;
  }
  return fullName;
}

// Take the game as the parameter
function currentGameReducer(game, action) {

  switch (action.type) {
    case TOGGLE_ADD_EXISTING_PLAYER_TO_GAME:
      return Object.assign({}, game, {showAddExistingPlayer: action.show});
    case TOGGLE_ADD_NEW_PLAYER_TO_GAME:
      return Object.assign({}, game, {showAddNewPlayer: action.show});
    case TOGGLE_CONFIGURE_SEATING:
      return Object.assign({}, game,
        {showConfigureSeating: action.show},
        {showConfigureSeatingKey: new Date().getTime()});
    case EDIT_GAME_PLAYER:
      return Object.assign({}, game, {editGamePlayerId: action.id});
    case SUBMIT_SEATING:
      // initialize the tables
      const tables = [];
      for (let i = 0; i < action.seatingConfig.numTables; i++) {
        tables.push({number: (i+1), seats: []});
      }
      // Add players to the tables
      let currentTable = 0;
      _.forEach(game.data.gamePlayers, function(gamePlayer) {
        tables[currentTable].seats.push({seatNumber: (tables[currentTable].seats.length+1),
          tableNumber: currentTable + 1,
          gamePlayerId: gamePlayer.id,
          gamePlayerName: getPlayerFullName(gamePlayer)});
        if (++currentTable === tables.length) {
          currentTable = 0;
        }
      });
      let gameWithSeating = Object.assign({}, game, {showConfigureSeating: false});
      gameWithSeating.data.seating = action.seatingConfig;
      gameWithSeating.data.tables = tables;
      return gameWithSeating;
    case ADDED_NEW_GAME:
      return Object.assign({}, game, {data: action.game}, {gettingCurrentGame: false}, {currentGameNotFound: false});
    case UPDATED_GAME:
      return Object.assign({}, game, {data: action.game});
    case GOT_CURRENT_GAME:
      return Object.assign({}, game, {data: action.game}, {gettingCurrentGame: false}, {currentGameNotFound: false});
    case GETTING_CURRENT_GAME:
      return Object.assign({}, game, {data: null}, {gettingCurrentGame: true}, {currentGameNotFound: false});
    case CURRENT_GAME_NOT_FOUND:
      return Object.assign({}, game, {data: null}, {gettingCurrentGame: false}, {currentGameNotFound: true});
    default:
      return game;
  }
}

export default currentGameReducer
