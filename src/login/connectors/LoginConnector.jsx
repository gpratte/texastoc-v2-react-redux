import Login from '../components/Login'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    token: state
  }
}

const LoginConnector = connect(
  mapStateToProps,
  null
)(Login)

export default LoginConnector
