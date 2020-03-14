import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME,
  TOGGLE_ADD_NEW_PLAYER_TO_GAME,
  TOGGLE_CONFIGURE_SEATING,
  ADD_NEW_PLAYER_TO_GAME,
  EDIT_GAME_PLAYER,
  UPDATE_GAME_PLAYER,
  DELETE_GAME_PLAYER,
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
    case ADD_NEW_PLAYER_TO_GAME:
      let newPlayer = action.player;
      newPlayer['id'] = new Date().getTime();
      newPlayer['buyInCollected'] = action.player.buyInCollected ? game.data.buyInCost : null;
      newPlayer['annualTocCollected'] = action.player.annualTocCollected ? game.data.annualTocCost : null;
      newPlayer['quarterlyTocCollected'] = action.player.quarterlyTocCollected ? game.data.quarterlyTocCost : null;

      let gameWithNewPlayer = Object.assign({}, game, {showAddNewPlayer: false});
      gameWithNewPlayer.data.gamePlayers.push(newPlayer);
      return gameWithNewPlayer;
    case EDIT_GAME_PLAYER:
      return Object.assign({}, game, {editGamePlayerId: action.id});
    case UPDATE_GAME_PLAYER:
      let gameWithUpdatedPlayer = Object.assign({}, game, {editGamePlayerId: null});

      // Make sure its a primitive
      const gamePlayerId = parseInt('' + action.gamePlayer.id);
      const finish = parseInt('' + action.gamePlayer.finish);

      const indexOfGamePlayer = _.findIndex(gameWithUpdatedPlayer.data.gamePlayers, {'id': gamePlayerId});
      const gamePlayerToUpdate = gameWithUpdatedPlayer.data.gamePlayers[indexOfGamePlayer];
      gamePlayerToUpdate['buyInCollected'] = action.gamePlayer.buyInCollected ? game.buyInCost : null;
      gamePlayerToUpdate['annualTocCollected'] = action.gamePlayer.annualTocCollected ? game.annualTocCost : null;
      gamePlayerToUpdate['quarterlyTocCollected'] = action.gamePlayer.quarterlyTocCollected ? game.quarterlyTocCost : null;
      gamePlayerToUpdate['rebuyAddOnCollected'] = action.gamePlayer.rebuyAddOnCollected ? game.quarterlyTocCost : null;
      gamePlayerToUpdate['knockedOut'] = action.gamePlayer.knockedOut;
      gamePlayerToUpdate['finish'] = finish === 11 ? null : finish;
      gamePlayerToUpdate['chop'] = action.gamePlayer.chop ? parseInt('' + action.gamePlayer.chop) : null;
      return gameWithUpdatedPlayer;
    case DELETE_GAME_PLAYER:
      let gameWithDeletedPlayer = Object.assign({}, game, {editGamePlayerId: null});
      _.remove(gameWithDeletedPlayer.data.gamePlayers, function (gp) {
        return gp.id === action.id;
      });
      return gameWithDeletedPlayer;
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
