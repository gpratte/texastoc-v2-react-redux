import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Redirect} from "react-router-dom";
import {addNewSeason} from '../seasonClient'
import {redirect, shouldRedirect} from "../../utils/util";

class NewSeason extends React.Component {

  addNewSeason = (e) => {
    e.preventDefault();
    const startDate = e.target.elements.startDateId.value;
    const mmddyyyy = startDate.split('/')
    addNewSeason(mmddyyyy[0], mmddyyyy[1], mmddyyyy[2]);
  }


  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    if (this.props.league.season.data !== null) {
      return (
        <Redirect to='/season'/>
      )
    }

    return (
      <div>
        <br/>
        <h1>New Season</h1>
        <br/>
        <p>The end of the season will be the day before the start date next year</p>
        <Form onSubmit={this.addNewSeason}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="text" placeholder="mm/dd/yyyy" id={'startDateId'}/>
          </Form.Group>
          <Button variant="primary" type="submit">Add New Season</Button>
        </Form>
      </div>
    );
  }
}

export default NewSeason
