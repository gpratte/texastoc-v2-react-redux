import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import {addNewSeason} from '../apis/seasonClient'

class NewSeason extends React.Component {

  addNewSeason = (e) => {
    e.preventDefault();
    const startDate = e.target.elements.startDateId.value;
    const mmddyyyy = startDate.split('/')
    addNewSeason(mmddyyyy[0], mmddyyyy[1], mmddyyyy[2]);
  }


  render() {
    return (
      <div>
        <h1>New Season</h1>
        <p>The end of the season will be the day before the start date next year</p>
        <Form onSubmit={this.addNewSeason}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="text" placeholder="mm/dd/yyyy" id={'startDateId'}/>
          </Form.Group>
          <Link to="/home">
            <Button variant="outline-secondary"> Home </Button>
          </Link>
          <Button variant="primary" type="submit">Add New Season</Button>
        </Form>
      </div>
    );
  }
}

export default NewSeason
