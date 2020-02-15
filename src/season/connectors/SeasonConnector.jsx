import Season from '../components/Season'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    season: state
  }
}

const SeasonConnector = connect(
  mapStateToProps,
  null
)(Season)

export default SeasonConnector
