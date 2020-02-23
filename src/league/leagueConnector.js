import League from './League'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    league: state
  }
}

const LeagueConnector = connect(
  mapStateToProps,
  null
)(League)

export default LeagueConnector
