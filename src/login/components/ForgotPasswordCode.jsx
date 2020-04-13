import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {shouldRedirect, redirect} from '../../utils/util';

class ForgotPasswordCode extends React.Component {

  reset = (e) => {
    e.preventDefault();
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league, true))) {
      return redirect(redirectTo);
    }

    return (
      <div>
        <br/>
        <h2>Enter code</h2>
        <Form onSubmit={this.reset}>
          <Form.Group>
            <Form.Control type="text" id={'codeId'} placeholder="Enter the code"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPasswordCode
