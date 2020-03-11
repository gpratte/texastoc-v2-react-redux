import {ADDED_NEW_SEASON} from '../actions/seasonActions'

// Take the season as the parameter
function seasonReducer(season, action) {
  switch (action.type) {
    case ADDED_NEW_SEASON:
      const newSeason = Object.assign({}, action.season);
      return newSeason;
    default:
      return season;
  }
}

export default seasonReducer
