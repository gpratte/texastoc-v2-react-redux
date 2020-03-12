import {
  ADDED_NEW_SEASON,
  GOT_SEASON,
  GETTING_SEASON,
  SEASON_NOT_FOUND} from '../actions/seasonActions'

// Take the season as the parameter
function seasonReducer(season, action) {
  switch (action.type) {
    case ADDED_NEW_SEASON:
      return Object.assign({}, {data: action.season}, {gettingSeason: false}, {seasonNotFound: false});
    case GOT_SEASON:
      const newSeason = Object.assign({}, season, {data: action.season}, {gettingSeason: false}, {seasonNotFound: false});
      return newSeason;
    case GETTING_SEASON:
      return Object.assign({}, {data: null}, {gettingSeason: true}, {seasonNotFound: false});
    case SEASON_NOT_FOUND:
      return Object.assign({}, {data: null}, {gettingSeason: false}, {seasonNotFound: true});
    default:
      return season;
  }
}

export default seasonReducer
