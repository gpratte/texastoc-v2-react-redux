
export const ADDED_NEW_SEASON = 'ADD_NEW_SEASON'

export function addNewSeason(season) {
  return { type: ADDED_NEW_SEASON, season }
}
