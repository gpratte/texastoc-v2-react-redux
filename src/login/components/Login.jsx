import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {login} from '../apis/loginClient'
import leagueStore from "../../league/leagueStore";
import {LOGGED_OUT} from "../actions/loginActions";

class Login extends React.Component {

  logout = () => {
    leagueStore.dispatch({type: LOGGED_OUT, token: null})
  }

  login = (e) => {
    e.preventDefault();
    login(e.target.elements.emailId.value, e.target.elements.passwordId.value)
  }

  render() {
    if (this.props.token === null || this.props.token.token === null) {
      return (
        <div>
          <br/>
          <h2>Please Log In</h2>
          <br/>
          <Form onSubmit={this.login}>
            <Form.Group>
              <Form.Control type="email" id={'emailId'} placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" id={'passwordId'} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
    return (
      <div>
        <br/>
        <h2>You are Logged In</h2>
        <p className={'main-p'}><Link>
          <Button variant="outline-secondary" onClick={() => this.logout() }> Log Out </Button>
        </Link>
        </p>
        <p className={'main-p'}><Link to="/home">
          <Button variant="outline-secondary"> Home </Button> </Link>
        </p>
      </div>
    )
  }
}

export default Login
