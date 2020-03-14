import {
  TOGGLE_ADD_EXISTING_PLAYER_TO_GAME,
  TOGGLE_ADD_NEW_PLAYER_TO_GAME,
  TOGGLE_CONFIGURE_SEATING,
  ADD_EXISTING_PLAYER_TO_GAME,
  ADD_NEW_PLAYER_TO_GAME,
  EDIT_GAME_PLAYER,
  UPDATE_GAME_PLAYER,
  DELETE_GAME_PLAYER,
  SUBMIT_SEATING,
  GETTING_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND,
  ADDED_NEW_GAME
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

  let playerId = null;

  switch (action.type) {
    case TOGGLE_ADD_EXISTING_PLAYER_TO_GAME:
      return Object.assign({}, game, {showAddExistingPlayer: action.show});
    case TOGGLE_ADD_NEW_PLAYER_TO_GAME:
      return Object.assign({}, game, {showAddNewPlayer: action.show});
    case TOGGLE_CONFIGURE_SEATING:
      return Object.assign({}, game,
        {showConfigureSeating: action.show},
        {showConfigureSeatingKey: new Date().getTime()});
    case ADD_EXISTING_PLAYER_TO_GAME:
      // Make sure its a primitive
      playerId = parseInt('' + action.player.id);

      // Find the player in the list of all the league players
      let player = _.find(game.players, {'id': playerId});
      player = Object.assign({}, player);
      player['playerId'] = playerId;
      player['buyInCollected'] = action.player.buyInCollected ? game.buyInCost : null;
      player['annualTocCollected'] = action.player.annualTocCollected ? game.annualTocCost : null;
      player['quarterlyTocCollected'] = action.player.quarterlyTocCollected ? game.quarterlyTocCost : null;

      let gameWithAddedPlayer = Object.assign({}, game, {showAddExistingPlayer: false});
      gameWithAddedPlayer.data.gamePlayers.push(player);
      return gameWithAddedPlayer;
    case ADD_NEW_PLAYER_TO_GAME:
      let newPlayer = action.player;
      newPlayer['id'] = new Date().getTime();
      newPlayer['buyInCollected'] = action.player.buyInCollected ? game.buyInCost : null;
      newPlayer['annualTocCollected'] = action.player.annualTocCollected ? game.annualTocCost : null;
      newPlayer['quarterlyTocCollected'] = action.player.quarterlyTocCollected ? game.quarterlyTocCost : null;

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
      _.forEach(game.gamePlayers, function(gamePlayer) {
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
    case GETTING_CURRENT_GAME:
      return Object.assign({}, game, {data: null}, {gettingCurrentGame: true}, {currentGameNotFound: false});
    case CURRENT_GAME_NOT_FOUND:
      return Object.assign({}, game, {data: null}, {gettingCurrentGame: false}, {currentGameNotFound: true});
    case ADDED_NEW_GAME:
      return Object.assign({}, game, {data: action.game}, {gettingCurrentGame: false}, {currentGameNotFound: false});
    default:
      return game;
  }
}

export default currentGameReducer
