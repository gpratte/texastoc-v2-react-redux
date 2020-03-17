/*
 * action types
 */

export const TOGGLE_ADD_EXISTING_PLAYER_TO_GAME = 'TOGGLE_ADD_EXISTING_PLAYER_TO_GAME'
export const TOGGLE_ADD_NEW_PLAYER_TO_GAME = 'TOGGLE_ADD_NEW_PLAYER_TO_GAME'
export const TOGGLE_CONFIGURE_SEATING = 'TOGGLE_CONFIGURE_SEATING'
export const ADD_NEW_PLAYER_TO_GAME = 'ADD_NEW_PLAYER_TO_GAME'
export const EDIT_GAME_PLAYER = 'EDIT_GAME_PLAYER'
export const UPDATE_GAME_PLAYER = 'UPDATE_GAME_PLAYER'
export const DELETE_GAME_PLAYER = 'DELETE_GAME_PLAYER'
export const SUBMIT_SEATING = 'SUBMIT_SEATING'

export const GETTING_CURRENT_GAME = 'GETTING_CURRENT_GAME'
export const CURRENT_GAME_NOT_FOUND = 'CURRENT_GAME_NOT_FOUND'
export const GOT_CURRENT_GAME = 'GOT_CURRENT_GAME'
export const ADDED_NEW_GAME = 'ADDED_NEW_GAME'
export const UPDATED_GAME = 'UPDATED_GAME'

/*
 * action creators
 */

export function toggleAddExistingPlayerToGame(flag) {
  return { type: TOGGLE_ADD_EXISTING_PLAYER_TO_GAME, flag }
}
export function toggleAddNewPlayerToGame(flag) {
  return { type: TOGGLE_ADD_NEW_PLAYER_TO_GAME, flag }
}
export function toggleConfigureSeating(flag) {
  return { type: TOGGLE_CONFIGURE_SEATING, flag }
}
export function addNewPlayer(player) {
  return { type: ADD_NEW_PLAYER_TO_GAME, player }
}
export function editGamePlayer(id) {
  return { type: EDIT_GAME_PLAYER, id }
}
export function updateGamePlayer(player) {
  return { type: UPDATE_GAME_PLAYER, player }
}
export function deleteGamePlayer(id) {
  return { type: DELETE_GAME_PLAYER, id }
}

export function submitSeating(seatingConfig) {
  return { type: SUBMIT_SEATING, seatingConfig}
}
