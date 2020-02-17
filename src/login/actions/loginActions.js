/*
 * action types
 */
export const LOGGED_IN= 'LOGGED_IN'

/*
 * action creators
 */
export function login(token) {
  return { type: LOGGED_IN, token }
}
